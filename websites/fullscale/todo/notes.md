## Server-side

- Structure
  - Authentication routes (`/api/v1/auth`)
    - Public routes
    - 3 routes:
      - Register
        - Must validate input values
          - i.e. first & last name, email, and password
            - Check if email already exists in the database
          - Use `express-validator` package for validation
        - Must return JWT in a cookie for authentication
      - Login
        - Must validate login values
          - i.e. email and password
            - Check password against database
          - Use `express-validator` package for validation
        - Must return JWT in a cookie for authentication
      - Logout
        - Reset cookie to remove JWT
