/* eslint-disable no-undef */

try {
    print("CREATING USER")
    db.createUser(
        {
            user: "user",
            pwd: "user",
            roles: [{ role: "readWrite", db: "appdb" }]
        }
    );
} catch (error) {
    print(`Failed to create developer db user:\n${error}`);
}

