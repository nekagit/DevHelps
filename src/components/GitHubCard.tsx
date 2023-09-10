import React, { useState } from "react";
import { Button, Card, Form, ListGroup } from "react-bootstrap";

interface IProps {
  title: string;
  width: string;
  height: string;
  color?: string;
  border?: string;
}

function BasicCard(props: IProps) {
  const { title, width, height, color, border } = props;
  const borderStyle = "1px solid black";
  const [branchName, setBranchName] = useState("");
  const [branchNames, setBranchNames] = useState([""]);
  const [commitMessage, setCommitMessage] = useState("");

  function getScriptParameter(scriptName: string) {
    switch (scriptName) {
      case "create-branch.bat": {
        return branchName;
      }
      case "sync-develop.bat": {
        return branchNames;
      }
      case "commit-Implemented.bat": {
        return "";
      }
      case "commit.bat": {
        return commitMessage;
      }
    }
  }
  const handleGitAction = async (scriptName: string) => {
    try {
      const scriptParameter = getScriptParameter(scriptName);
      console.log(scriptParameter);
      const response = await fetch("http://localhost:3000/execute-git-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scriptName, scriptParameter }), // Include branchName in the request body
      });

      if (response.ok) {
        console.log(`Git script "${scriptName}" executed successfully.`);
      } else {
        console.error("Error executing Git script.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleBranchNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBranchName(event.target.value);
  };

  const handleBranchNamesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const branchNamesSplitted = event.target.value.split(",");
    setBranchNames(branchNamesSplitted);
  };

  const handleCommitMessageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommitMessage(event.target.value);
  };

  return (
    <>
      <Card
        style={{
          width: width,
          height: height,
          backgroundColor: color,
          border: border ?? borderStyle,
        }}
      >
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <ListGroup>
            <ListGroup.Item>
              {/* Input field for branch name */}
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Branch Name"
                  value={branchName}
                  onChange={handleBranchNameChange}
                />
              </Form.Group>
              <Button onClick={() => handleGitAction("create-branch.bat")}>
                Create Branch from 'develop'
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Branch Names to sync with"
                  value={branchNames}
                  onChange={handleBranchNamesChange}
                />
              </Form.Group>
              <Button onClick={() => handleGitAction("sync-develop.bat")}>
                Sync All with 'develop'
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={() => handleGitAction("commit-Implemented.bat")}>
                Commit as "new Implementation"
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Commitmessage"
                  value={commitMessage}
                  onChange={handleCommitMessageChange}
                />
              </Form.Group>
              <Button onClick={() => handleGitAction("commit.bat")}>
                Commit with message
              </Button>
            </ListGroup.Item>
            {/* Add more ListGroup items with corresponding script names */}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
