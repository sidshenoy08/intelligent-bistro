# Backend

The backend is developed using Node.js and connects to the Gemini 2.5 Flash model through the Gemini API.

*zod* is used for validating the API response schema to ensure that it contains the required item information.

The user prompts are received from the frontend, passed to the model with the pre-set menu and the current cart for the model to respond with a cart-related action.

The user can ask the AI assistant to suggest items from the menu, add/delete/modify items, clear the cart, and more.

The AI assistant can ask for clarifications in case a user's message is unclear.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the server

   ```bash
   npx nodemon server.js

   OR

   ```bash
   node server.js
