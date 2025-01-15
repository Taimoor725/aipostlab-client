<<<<<<< HEAD

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

# To learn React, check out the [React documentation](https://reactjs.org/).

# Introduction

TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project.

# Getting Started

TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:

1. Installation process
2. Software dependencies
3. Latest releases
4. API references

# Build and Test

TODO: Describe and show how to build your code and run the tests.

# Contribute

TODO: Explain how other users and developers can contribute to make your code better.

If you want to learn more about creating good readme files then refer the following [guidelines](https://docs.microsoft.com/en-us/azure/devops/repos/git/create-a-readme?view=azure-devops). You can also seek inspiration from the below readme files:

- [ASP.NET Core](https://github.com/aspnet/Home)
- [Visual Studio Code](https://github.com/Microsoft/vscode)
- [Chakra Core](https://github.com/Microsoft/ChakraCore)
  > > > > > > > 50b4dd52089a2163b3230e0d08ce0977089ba80d

/\*
const CanvasEditor = () => {
const canvasRef = useRef(null);
const [canvas, setCanvas] = useState<Canvas | null>(null);
const [text, setText] = useState("Custom Text");
const [fontSize, setFontSize] = useState(24);
const [color, setColor] = useState("blue");

// Initialize Fabric.js canvas
useEffect(() => {
if (canvasRef.current) {
const fabricCanvas = new Canvas(canvasRef.current, {
height: 800,
width: 800,
backgroundColor: "#ffffff",
});
setCanvas(fabricCanvas);
createInitialImage(fabricCanvas);
return () => {
fabricCanvas.dispose();
};
}
}, []);

// Create initial image with default elements
const createInitialImage = (fabricCanvas: Canvas) => {
Image.fromURL("https://via.placeholder.com/800", {}, (img: Image) => {
img.set({ left: 0, top: 0, scaleX: 1, scaleY: 1 });
fabricCanvas.backgroundImage = img;
fabricCanvas.renderAll();
});

    // Add title
    const title = new Text("Default Title", {
      left: 100,
      top: 50,
      fontSize: 36,
      fill: "black",
    });
    fabricCanvas.add(title);

    // Add subtitle
    const subtitle = new Text("Default Subtitle", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "gray",
    });
    fabricCanvas.add(subtitle);

    // Add logo
    Image.fromURL("https://via.placeholder.com/100", {}, (img: Image) => {
      img.set({ left: 650, top: 650, scaleX: 1, scaleY: 1 });
      fabricCanvas.add(img);
    });

};

// Add a rectangle
const addRectangle = () => {
const rect = new Rect({
width: 100,
height: 100,
fill: "red",
left: 50,
top: 50,
});
if (canvas) {
canvas.add(rect);
}
};

// Add custom text
const addText = (
text: string,
left: number,
top: number,
fontSize: number,
color: string
) => {
const newText = new Text(text, {
left,
top,
fontSize,
fill: color,
});
if (canvas) {
canvas.add(newText);
}
};

// Add image
const addImage = (url: string) => {
Image.fromURL(url, {}, (img: Image) => {
img.set({ left: 200, top: 200, scaleX: 0.5, scaleY: 0.5 });
if (canvas) {
canvas.add(img);
}
});
};

// Save canvas as JSON
const saveCanvas = () => {
if (canvas) {
const canvasJSON = canvas.toJSON();
console.log("Canvas JSON:", canvasJSON);
// Make an API call to save JSON to the database
} else {
console.error("Canvas is not initialized.");
}
};

// Load canvas from JSON
const loadCanvas = (json: any) => {
if (canvas) {
canvas.loadFromJSON(json, () => {
canvas.renderAll();
});
} else {
console.error("Canvas is not initialized.");
}
};

return (
<div className={styles.editorContainer}>
<div className={styles.controls}>
<input
type="text"
value={text}
onChange={(e) => setText(e.target.value)}
placeholder="Enter text"
className={styles.input}
/>
<input
type="number"
value={fontSize}
onChange={(e) => setFontSize(Number(e.target.value))}
placeholder="Font size"
className={styles.input}
/>
<input
type="color"
value={color}
onChange={(e) => setColor(e.target.value)}
className={styles.input}
/>
<button onClick={addRectangle} className={styles.button}>
Add Rectangle
</button>
<button
onClick={() => addText(text, 150, 150, fontSize, color)}
className={styles.button} >
Add Text
</button>
<button
onClick={() => addImage("https://via.placeholder.com/150")}
className={styles.button} >
Add Image
</button>
<button onClick={saveCanvas} className={styles.button}>
Save Canvas
</button>
</div>
<canvas ref={canvasRef} className={styles.canvas} />
</div>
);
};

export default CanvasEditor;
\*/
