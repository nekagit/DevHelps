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
  console.log(branchName);
  const handleGitAction = async (scriptName: string) => {
    try {
      const response = await fetch("http://localhost:3000/execute-git-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ scriptName, branchName }), // Include branchName in the request body
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
            <Button onClick={() => handleGitAction("sync-develop.bat")}>
              Sync All with 'develop'
            </Button>
            <Button
              onClick={() => handleGitAction("commit-new-implementation.bat")}
            >
              Commit as "new Implementation"
            </Button>
            {/* Add more ListGroup items with corresponding script names */}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
