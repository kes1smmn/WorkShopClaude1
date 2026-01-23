from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime
import hashlib
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://admin:password123@localhost:27017/hashdb?authSource=admin')
client = MongoClient(MONGO_URI)
db = client.hashdb
hashes_collection = db.hashes

SUPPORTED_ALGORITHMS = ['md5', 'sha1', 'sha256', 'sha512']


@app.route('/api/status', methods=['GET'])
def status():
    """Health check endpoint."""
    try:
        # Check MongoDB connection
        client.admin.command('ping')
        mongo_status = 'connected'
    except Exception:
        mongo_status = 'disconnected'

    return jsonify({
        'status': 'healthy',
        'message': 'Flask backend is running',
        'mongodb': mongo_status
    })


@app.route('/api/hash', methods=['POST'])
def hash_file():
    """
    Compute hash of uploaded file.
    Expects: multipart/form-data with 'file' and 'algorithm' fields.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    algorithm = request.form.get('algorithm', 'sha256').lower()

    if algorithm not in SUPPORTED_ALGORITHMS:
        return jsonify({
            'error': f'Unsupported algorithm. Use one of: {SUPPORTED_ALGORITHMS}'
        }), 400

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Read file content and compute hash
    file_content = file.read()
    hash_obj = hashlib.new(algorithm)
    hash_obj.update(file_content)
    computed_hash = hash_obj.hexdigest()
    file_size = len(file_content)

    # Check if this exact hash already exists in the database
    existing = hashes_collection.find_one({
        'hash': computed_hash,
        'algorithm': algorithm
    })

    previously_seen = existing is not None

    # Store the hash record in MongoDB
    hash_record = {
        'filename': file.filename,
        'algorithm': algorithm,
        'hash': computed_hash,
        'size': file_size,
        'timestamp': datetime.utcnow()
    }
    hashes_collection.insert_one(hash_record)

    return jsonify({
        'filename': file.filename,
        'algorithm': algorithm,
        'hash': computed_hash,
        'size': file_size,
        'previously_seen': previously_seen,
        'first_seen': existing['timestamp'].isoformat() if existing else None
    })


@app.route('/api/hashes', methods=['GET'])
def get_hashes():
    """Get all hashed files from the database."""
    try:
        # Get all hashes, sorted by timestamp descending (newest first)
        hashes = list(hashes_collection.find({}, {'_id': 0}).sort('timestamp', -1))

        # Convert datetime objects to ISO format strings
        for h in hashes:
            if 'timestamp' in h:
                h['timestamp'] = h['timestamp'].isoformat()

        return jsonify({
            'hashes': hashes,
            'count': len(hashes)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/hashes', methods=['DELETE'])
def clear_hashes():
    """Clear all hash records from the database."""
    try:
        result = hashes_collection.delete_many({})
        return jsonify({
            'message': 'All hash records deleted',
            'deleted_count': result.deleted_count
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
