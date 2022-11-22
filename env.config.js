export default {
    "port": 7980,
    "mongo_url" : "mongodb://mongo/swavey",
    "mongo_test_url" : "mongodb://mongo/swavey_test",
    "jwt_secret": "",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "permissionLevels": {
        "NORMAL_USER": 1,
        "PAID_USER": 4,
        "ADMIN": 2048
    }
};
