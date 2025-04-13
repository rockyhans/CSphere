import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useCodeMirror } from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { solarizedDark } from "@uiw/codemirror-theme-solarized";
import "./javaComp.css";
import ReactMarkdown from "react-markdown";

function CppCompiler() {
  const [cppCode, setCppCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [inputRequired, setInputRequired] = useState(false);
  const [inputType, setInputType] = useState("");
  const [logOutput, setLogOutput] = useState("");
  const [messages, setMessages] = useState([]);
  const [outputX, setOutputX] = useState("");
  const [clicked, setClicked] = useState(false);
  const cppEditor = useRef(null);

  useCodeMirror({
    container: cppEditor.current,
    value: cppCode,
    theme: solarizedDark,
    extensions: [cpp(), solarizedDark],
    onChange: (value) => {
      setCppCode(value);
      setLogOutput(`C++: ${value}`);
    },
    lineNumbers: true,
    lineWrapping: false,
    scrollbarStyle: "native",
    viewportMargin: Infinity,
  });

  const doesCodeRequireInput = (code) => {
    return code.includes("cin") || code.includes("getline");
  };

  const compileCppCode = async () => {
    setError("");
    setOutput("");

    if (doesCodeRequireInput(cppCode) && input.trim() === "") {
      setInputType("string");
      setError("Please provide input for the code — expected string.");
      setInputRequired(true);
      return;
    }

    setLoading(true);
    setInputRequired(false);

    const postData = {
      language: "cpp",
      version: "10.2.0",
      files: [
        {
          name: "Main.cpp",
          content: cppCode,
        },
      ],
      stdin: input,
    };

    try {
      const res = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setOutput(
        cleanOutput(res.data.run.output || "No output from the server.")
      );
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setError(
        "Failed to compile C++ code. Please check your code and try again."
      );
    }

    setLoading(false);
  };

  const cleanOutput = (output) => {
    return output.replace(/`/g, "").replace(/\*/g, "").trim();
  };

  const clearInput = () => {
    setInput("");
    setError("");
    setInputRequired(false);
  };

  const generateAns = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCok-7EJjFVuirqtP0Rzzpi5u-im4zvuYA",
        {
          contents: [{ parts: [{ text: logOutput }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = cleanOutput(
        res.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response received"
      );
      setMessages((prevMessages) => [
        { text: botResponse, isBot: true },
        ...prevMessages,
      ]);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setMessages((prevMessages) => [
        { text: "Failed to generate AI response.", isBot: true },
        ...prevMessages,
      ]);
      setError("Failed to generate AI response. Please try again.");
    }
    setLoading(false);
  };

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 2000);
  };

  //Files crude operations:

  const [name, setName] = useState("");
  const [files, setFiles] = useState([]);
  const [editingFile, setEditingFile] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  //Fetching:
  const fetchFiles = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found!");
      return;
    }
    try {
      const response = await fetch("https:/twondbackend.onrender.com/api/files", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch files");
      const data = await response.json();
      if (response.ok) {
        setFiles(data);
      } else {
        console.error("Fetch Files Error:", data.error);
        alert(data.error);
      }
    } catch (error) {
      console.error("Fetch Files Error:", error.message);
    }
  };

  // Creation:
  const handleFileCreation = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in again.");
      return;
    }
    const response = await fetch("https:/twondbackend.onrender.com/api/files", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, content: cppCode }),
    });
    const data = await response.json();
    if (response.ok) {
      setName("");
      setCppCode("");
      setShowInput(false);
      fetchFiles();
    } else {
      alert(data.error);
    }
  };

  // Deletion:
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`https:/twondbackend.onrender.com/api/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      alert("File deleted successfully");
      fetchFiles();
    } else {
      alert("Error deleting file");
    }
  };

  // Saving Changes:
  const handleSave = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const response = await fetch(`https:/twondbackend.onrender.com/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content: cppCode }),
    });
    if (response.ok) {
      alert("File updated successfully");
      setEditingFile(null);
      setCppCode("");
      fetchFiles();
    } else {
      alert("Error updating file");
    }
    setLoading(false);
  };

  // Edit The files:
  const startEditing = (file) => {
    setEditingFile(file);
    setCppCode(file.content);
  };

  // Others Operations:
  const [showInput, setShowInput] = useState(false);
  const [isFullHeight, setIsFullHeight] = useState(false);
  const increaseHeight = () => {
    setIsFullHeight(true);
  };
  const closePopup = () => {
    setIsFullHeight(false);
  };

  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 100,
    top: 680,
  });
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newHeight = dimensions.height + (dimensions.top - e.clientY);
        const newTop = e.clientY;

        if (newHeight > 100) {
          setDimensions((prevDimensions) => ({
            ...prevDimensions,
            height: newHeight,
            top: newTop,
          }));
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, dimensions]);

  const [showOutput, setShowOutput] = useState(true);
  const [showAiAnswer, setShowAiAnswer] = useState(false);
  const [pos, setPos] = useState("output"); // Add pos state here

  return (
    <div className="JavaCompiler">
      <div className="javacompilerHeader">
        <h1 className="comH1" style={{ textAlign: "left" }}>
          C++ Compiler
        </h1>
        <button
          onClick={increaseHeight}
          style={{ padding: "10px 20px" }}
          className="increseHeight"
        >
          Increase Height to 100% of the Screen
        </button>
      </div>

      <div className={isFullHeight ? "fullscreen" : "editor-container"}>
        {isFullHeight && (
          <button
            onClick={closePopup}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "10px 20px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        )}

        <div className="filesBar">
          <div className="filesCreation">
            <form onSubmit={handleFileCreation} className="files">
              {showInput && (
                <input
                  type="text"
                  placeholder="File Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              )}
              <input
                type="text"
                placeholder="File Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <button type="submit">Create File</button>
            </form>
          </div>

          <div className="file-list-container">
            <div className="ulScroll">
              <ul>
                {files.map((file) => (
                  <li key={file._id}>
                    <h3>{file.name} :</h3>
                    <div className="butn">
                      <button onClick={() => startEditing(file)}>Open</button>
                      <button onClick={() => handleDelete(file._id)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {editingFile && (
            <div className="files">
              <div className="margin">
                <button onClick={() => handleSave(editingFile._id)}>
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditingFile(null);
                    setCppCode("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="inpOut">
          <div className="ele1">
            <div className="row">
              <h3>Write Your C++ Code :</h3>
              <button
                onClick={() => {
                  compileCppCode();
                }}
                className="submit"
                style={{ border: "none" }}
              >
                <b>{loading ? "Compiling..." : "Compile and Run"}</b>
              </button>
            </div>

            <div
              ref={cppEditor}
              className={isFullHeight ? "editorFull" : "editor"}
            ></div>
          </div>

          <div className="ele2">
            <div className="iptDiv">
              <h3>
                <b>Input : </b>
              </h3>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter requires input..."
                className="input-textarea"
              />
              <button onClick={clearInput} className="clear-input-btn">
                Clear Input
              </button>
            </div>

            <div className="optDiv">
              {inputRequired && (
                <div className="input-message" style={{ color: "orange" }}>
                  Please provide input for the code — expected {inputType}.
                </div>
              )}
              {/* <h3
                style={{
                  color: "white",
                  marginTop: "0px",
                  textAlign: "center",
                }}
              >
                Output :
              </h3>

              <textarea
                className="output"
                value={output}
                style={{
                  marginTop: "0px",
                  paddingLeft: "15px",
                  outline: "none",
                  padding: "10px",
                  resize: "none",
                }}
                disabled
              /> */}

              <div className="oxxxx">
                <div className="fffff">
                  <button
                    className={`output-btn ${pos === "output" ? "active" : ""}`}
                    style={{
                      marginTop: "0px",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      setShowOutput(true);
                      setShowAiAnswer(false);
                      setPos("output");
                    }}
                  >
                    <b>Output :</b>
                  </button>

                  <div>
                    <button
                      className={`ai-answer-btn ${
                        pos === "outputX" ? "active" : ""
                      }`}
                      onClick={() => {
                        setShowOutput(false);
                        setShowAiAnswer(true);
                        setPos("outputX");
                      }}
                    >
                      <b>AI Answer:</b>
                    </button>
                  </div>
                </div>
                {showOutput && (
                  <textarea
                    className="output"
                    value={output}
                    style={{
                      height: isFullHeight ? "320px" : "",
                    }}
                    disabled
                  />
                )}
                {showAiAnswer && (
                  <div
                    className={pos === "output" ? "output active" : "output"}
                    style={{
                      height: isFullHeight ? "320px" : "",
                    }}
                  >
                    <div
                      className="aiSolution"
                      style={{
                        height: "100%",
                        width: "100%",
                        backgroundColor: "transparent",
                        resize: "none",
                        border: "none",
                        color: "rgb(245, 211, 124)",
                        overflowX: "auto",
                      }}
                      placeholder="Here , You will see the Solution of Error in the written code ..."
                      disabled
                    >
                      <ReactMarkdown>{outputX}</ReactMarkdown>{" "}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "none" }}>{setOutputX}</div>

      <h1 className="comH1" style={{ marginTop: "20px", textAlign: "left" }}>
        Code with AI{" "}
      </h1>

      <div className="aiPage">
        <div className="ele2AiPage">
          <button
            className={`colorChangeBtn ${clicked ? "clicked" : ""}`}
            onClick={() => {
              handleClick();
              generateAns();
            }}
          >
            <b>
              {loading ? "Generating AI Response..." : "Generate AI Response"}
            </b>
          </button>
          <div className="ele22"></div>

        </div>

        <div className="ele1AI" style={{ backgroundColor: "transparent" }}>
          <div className="userTextareaDiv">
            <textarea
              value={logOutput}
              className="userTextarea"
              placeholder="View your Code written in the editor , and feel free to ask any Questions related to it!"
              onChange={(e) => setLogOutput(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: "red", display: "none" }}>{error}</div>
          )}

          <div className="chatWrapper">
            <div className="aiAnsTextareaDiv">
              {messages.map(
                (message, i) =>
                  message.isBot &&
                  message.text && (
                    <textarea
                      className="aiAnsTextarea"
                      key={i}
                      disabled
                      value={message.text}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CppCompiler;
