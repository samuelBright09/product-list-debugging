// bug1: App  and add-to-cart Components decorator is ending with a semicolon/ anguler doesnt support
// interface declarations are decalred below app-component. Also there's no separation of concern// created independent file
//AddToCard component import is declared and not used. App Component metadata is missing an import array.
Hardcoded desert names/ repetition html templatte/ nobinding from 
//Decrease logic of quantity runs in the negative. Condition for decrease is wrong
// commented scss in app scss
// Made cart component independent by creating a cart component 


# Bug Report 
## Project: Angular E-commerce (Cart & Product Listing)
### 1. Incorrect Decorator Syntax
#### Type: Syntax Error

#### Location: AppComponent, AddToCartComponent

#### Description: The @Component decorators are incorrectly terminated with a semicolon (;), which is not supported in Angular.


#### Fix: Remove semicolons after @Component({ ... }).

### 2. Interface Declarations in Wrong File
#### Type: Architectural / Code Quality

#### Location: Inside app.component.ts

#### Description: Interfaces are declared in the main component file, violating separation of concerns.


#### Fix: Move interfaces to dedicated .ts files in a models/ or interfaces/ folder.

### 3. Unused Import
#### Type: Code Hygiene

#### Location: AddToCartComponent import in AppComponent

#### Description: AddToCartComponent is imported but never used.


#### Fix: Remove unused import if the component is not needed, or register it properly if intended for use.

### 4. Missing imports Array in Component Metadata
#### Type: Configuration Error

#### Location: AppComponent

#### Description: The imports array is missing in the @Component metadata, which is required when using standalone components or external modules.


 Fix: Add imports to the component metadata.

### 5. Hardcoded Product Names and Repetitive HTML
#### Type: UI/UX Bug

#### Location: app.component.html

#### Description: Product names are hardcoded and HTML is repeated without use of Angular structural directives.

#### Fix: Replace hardcoded elements with @for loop and bind data dynamically.

### 6. Quantity Decrease Logic Allows Negative Values
#### Type: Logical Bug

#### Location: CartComponent (or similar logic)

#### Description: The quantity decrement function does not prevent the value from going below 0.


#### Fix: Add conditional check:

if (item.quantity > 1) {
  item.quantity--;
}


### 7. Commented Out SCSS in app compponent Styles
#### Type: Style / Cleanliness

#### Location: app.component.scss

#### Description: Large blocks of SCSS are commented out.


#### Fix: uncommented scss 

