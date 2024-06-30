# create-frax-app

A command-line interface tool for quickly scaffolding blockchain projects by cloning a template repository and customizing it with a project-specific name and configurations.

## Features

-   **Easy Setup**: Set up your blockchain project with just one command.
-   **Customization**: Automatically replaces placeholders with your project-specific settings.
-   **Flexibility**: Works with any Git repository as a template, allowing for a wide range of project types.

## Installation

You don't need to install the package globally, thanks to `npx`. However, if you prefer to install it for repeated use, you can do so using npm:

```bash
npm install -g create-frax-app
```

## Usage

To create a new project, simply run:

```bash
npx create-frax-app <project-name>
```

Or, if you have installed the package globally:

```bash
create-frax-app <project-name>
```

## Requirements

-   Node.js (LTS version or higher)
-   Git
