declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}

declare module '*.css?inline' {
    const content: string; // or whatever type you expect from inline CSS
    export default content;
}