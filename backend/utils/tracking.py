# This is a mock — real tracking can be built using location APIs or mobile app pings
def get_serviceman_location(serviceman_id):
    # Example mock response
    return {
        'latitude': 22.7196,
        'longitude': 75.8577,
        'status': 'en route'
    }

def update_location(serviceman_id, lat, lng):
    # Placeholder for DB update
    print(f"Updated location for serviceman {serviceman_id}: ({lat}, {lng})")
