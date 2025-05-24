# Shopify Project Setup Checklist

## First Time Setting Up a Project?

If this is your first time setting up the project, follow these steps:

1. **Install Prettier Plugin:**

   - Download and install the Prettier plugin in your code editor (e.g., VSCode).

2. **Enable Auto Format on Save:**
   - Go to **Settings** → **Text Editor** → **Formatting** → Enable **Format On Save**.
   - Then, search for `@id:editor.formatOnSave @lang:liquid` and ensure **Format On Save** is enabled for Liquid files.

---

## Setup

1. **Configure the Shopify URL:**

   - In `package.json`, replace every instance of `shopify_url_here` with the name of your store.

2. **Install Dependencies:**

   - Run the following command to install all necessary dependencies:
     ```bash
     npm install
     ```

3. **Pull the Shopify Theme:**

   - Run the command to pull the full Shopify theme from the selected store:
     ```bash
     npm run pull:theme
     ```

4. **Include the Stylesheet and Script in `theme.liquid`:**

   - Inside `<head>`, add the following

     ```liquid
     {{- 'edition.css' | asset_url | stylesheet_tag: preload: true -}}

     <script src="{{ 'edition.js' | asset_url }}" defer></script>
     ```

---

## Scripts Explained

- **`start`:**
  Starts the development process. This allows for watching file changes while working with Shopify's theme development mode.

- **`webpack:watch`:**
  Watches for changes in your files and recompiles them. This helps to automatically rebuild your assets when changes are made.

- **`webpack:build`:**
  Builds your project for production using Laravel Mix. This compiles all your assets and prepares them for deployment.

- **`shopify:dev`:**
  Runs Shopify's theme development mode.

- **`pull:theme`:**
  Pulls the full Shopify theme from the selected store.

- **`pull:config`:**
  Pulls user-configured files (like `settings_data.json`, locales, and templates) from the selected store. It ensures you have the latest configuration files without overwriting your sections, assets and snippets

- **`theme:check`:**
  Runs checks/tests on the theme files verifying liquid syntax or checking for errors that could affect the theme’s functionality.

---

## Branch Deployment

### Pushing to dev
When pushing to dev

#### Deployment Process
1. **Automatic Theme Creation**  
   Pushing to any non-main branch generates a new unpublished theme in each connected Shopify environment.

2. **Environment Targeting**  
   Deployment occurs to all stores configured in your GitHub environments (see [GitHub Environments Setup](#github-environments-setup)).

3. **Theme Preview & Approval**  
   - Access themes via Shopify Admin: `Online Store > Themes`
   - Use the "Preview" and "Share preview" functions to:
     - Verify your changes
     - Send preview links to clients/project leads for approval

#### Critical Rules
- **Never publish a dev-theme without:**
  - Explicit client approval via preview link
  - Final review by project lead
- **Never publish dev-themes to stores with MARKETS**

#### Troubleshooting
- If deployment fails due to full theme storage:
  1. Consult with project lead or client
  2. Identify and remove unused themes
  3. Obtain confirmation before deleting any themes


### Pushing to main

#### Deployment Process
1. **Live Theme Update**  
   Merges your changes into the currently published theme while preserving:
   - All theme settings and configurations
   - Existing locales and translations
   - Customer-facing content
   -( All files located in /locales, /config and /templates)

2. **Environment Targeting**  
   ⇨ **Updates ALL production stores configured in your GitHub environments**  
   (see [GitHub Environments Setup](#github-environments-setup))  
   *Changes go live immediately - verify environments before pushing!*

3. **Version Control**  
   - Always create a backup theme before deployment.
   - This is done by going to the Shopify admin of the destination stores and creating a duplicate theme of the live theme.

#### Critical Rules
- **Never merge to main without**
  - Review by project lead
  - Pull request approval

- **Pre-Launch Checklist**:
  - ✅ Client or Project Lead apporval
  - ✅ Pull request apporval
  - ✅ Backup theme created on all environments

#### Emergency Protocol
If deployment fails:
1. Immediately check if any changes made it to live theme
2. If any changes made it to live, check if anything broke
3. If anything broke, revert the merge
4. If this also fails, consult CC
---

## Development

- Start the development environment by running:
  ```bash
  npm start
  ```


---

## TypeScript Development

The project uses TypeScript for better type safety and developer experience. Here's how the TypeScript structure is organized:

### Directory Structure

- **`resources/scripts/`**: Main directory for all TypeScript code
  - **`components/`**: Contains reusable UI components
  - **`utils/`**: Contains utility/helper functions
  - **`app.ts`**: Main entry point for the application

- **`types/`**: Dedicated folder for TypeScript type definitions
  - Contains predefined types for Liquid Storefront Objects
  - Includes request/response type definitions for API endpoints

### Creating a New Component

1. Create a new folder for your component inside `scripts/components/`
2. Add your component logic in `.ts` files within that folder
3. Export the component
4. Import and use the component in `app.ts` or other relevant files
---

## Tailwind CSS Development

- The project uses Tailwind CSS for styling components
- **Configuration:**
  - Tailwind configuration is located in the `resources/styles/app.css` directory
  - Custom CSS (non-Tailwind) should be placed in `resources/styles/app.css`
  
- **Usage:**
  - When writing styles, use the `tw:` prefix to indicate Tailwind classes
  - Example: `<div class="tw:flex tw:items-center">Content</div>`
---

## GitHub Environments Setup

For deploying to different stores, you'll need to set up GitHub environments with the required secrets and variables:

### 1. Access GitHub Environments
Navigate to your repository's settings:  
`https://github.com/ejlskov-design/your-repo-name/settings/environments`

### 2. Create New Environments
- Click "New environment" for each store
- Name environments according to the store (e.g., `dk`, `no` etc)

### 3. Required Configuration
Each environment needs:
**Environment Secret**  
`THEME_ACCESS` - Theme Access token from Shopify

**Environment Variable**  
`SHOPIFY_URL` - Store URL (format: `store-name.myshopify.com`)

#### 3.1 Obtaining Theme Access Token
1. Install the "Theme Access" app on the destination Shopify store
2. Generate a new access token with appropriate permissions
3. Add this token as the `THEME_ACCESS` secret in GitHub

#### 3.2 Obtaining SHOPIFY_URL
1. Copy the store url from the destination store

#### 4. Update theme.deploy.yml
In the theme-deploy.yml update the line target: with an array of the added evironents
  ```bash
  ReuseableMatrixJobForDeployment:
    needs: build
    strategy:
      fail-fast: true
      matrix:
        target: ['dk']
  ```
---

## Project Structure

The project is structured in a way that separates concerns and keeps things organized.

### `resources/`

- **`liquid/`**  
  This folder holds the Liquid snippets, and sections used for some of our components (With time it will contain all).

- **`components/`**  
  This folder contains reuseable TypeScript components

- **`utils/`**  
  This folder contains utility function such as helper functions and functions to make requests to Shopifys Ajax apis

- **`styles/`**  
  This folder contains Tailwind CSS v4 config + other styles.

- **`types/`**  
  This folder contains TypeScript type definitions used throughout the project. It includes predefined types for various elements, such as Liquid Storefront Objects aswell as response / request types for endpoints.


The folders, github, .husky and config files in the root directory are not mentioned as they for the most part should not be edited
---