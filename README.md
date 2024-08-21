# Video Share

Video Share is a web application built for sharing and viewing videos. It features user authentication, video uploads, and a sleek, modern design.

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Video Upload**: Users can upload videos to share with others.
- **Responsive Design**: Tailwind CSS is used to ensure the app is responsive and user-friendly across different devices.
- **Video Viewing**: Stream videos directly in the browser.

## Tech Stack

- **Next.js**: The React framework used for server-side rendering and static site generation.
- **TypeScript**: Provides static typing to help prevent errors and improve development efficiency.
- **Database**: MongoDb.
- **JWT (JSON Web Tokens)**: Used for authenticating users securely.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/video-share.git
   ```

2. Navigate to the project directory:
    ```bash
    cd video-share
    ```

3. Install dependencies
    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add the variables from the `.env.example` file and modify the details: 
    `.env variables`
    ```
    MONGO_URI=mongodb://localhost:27017/videoapp
    TOKEN_SECRET=Thisisatokensecret
    ``` 

5. Start the server
    ```bash
    npm run dev
    ```

## Contributing

Feel free to open issues or submit pull requests to improve the app. Ensure that your contributions align with the project's coding standards and include appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact kumbharrohit2803@gmail.com.