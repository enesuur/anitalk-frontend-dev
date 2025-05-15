# Anitalk Project Architecture

Anitalk is structured using a **feature-based architecture** to maximize modularity, reusability, and maintainability. The project distinguishes between **global modules** and **feature-local modules**, creating a scalable and organized codebase.

## 🔧 Feature-Based Architecture

Each page or feature (e.g., `Home`, `Settings`, `Profile`) includes its own set of related resources, all grouped in the same directory. This encourages better isolation, ownership, and ease of understanding.

### 📁 Local Folder Structure (Per Feature)

Within a feature folder, the following subfolders are used. All local module folders start with an underscore prefix to visually separate them from main route files:

```
/app/page/
├── _components/     # Reusable UI components specific to this feature
├── _helpers/        # Utility functions only used in this feature
├── _services/       # API or data-fetching logic tied to the feature
├── _styles/         # Local CSS/SCSS modules
├── _tests/          # Unit or integration tests for
...
feature-specific logic
```

This layout allows developers to maintain **local scope**, ensuring minimal dependencies across unrelated features.

## 🌍 Global Architecture

For logic and components used across multiple features, Anitalk also includes shared global modules to reduce code duplication.

### 📁 Global Folder Structure

```
/shared/
├── components/     # Globally shared UI components
├── helpers/        # Utility functions reused across
/assets/...
/http/...
/services/...
/schemas/...
...rest
```

Global helpers and components are imported into features when cross-cutting functionality is needed. This design keeps global scope minimal and intentional.

## ✅ Benefits

- **Better Modularity:** Easier to reason about the purpose and scope of code.
- **Local Isolation:** Each feature is self-contained, reducing unintended side effects.
- **Scalability:** New features can be added without impacting existing code.
- **Maintainability:** Easier testing, updating, and debugging thanks to localized structures.

## 📌 Summary

- Anitalk uses **feature-based architecture** with local `_components`, `_helpers`, `_services`, `_styles`, and `_tests`.
- Shared logic lives in the global `/shared` directory.
- This architecture enforces good separation of concerns, promotes reusability, and helps scale the project effectively.

PS Note: We might change \_tests in later on.We are working on it.
