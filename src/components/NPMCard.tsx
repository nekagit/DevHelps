
import { Button, Card, ListGroup } from "react-bootstrap";

interface IProps {
  title: string;
  width: string;
  height: string;
  color?: string;
  border?: string;
}

function NPMCard(props: IProps) {
  const { title, width, height, color, border } = props;
  const borderStyle = "1px solid black";


  const handleNPMAction = async (scriptName: string) => {
    try {
      const response = await fetch("http://localhost:3000/execute-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scriptName: scriptName,
          scriptParameters: [""],
        }), // Include branchName in the request body
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
              <Button onClick={() => handleNPMAction("npm run start.bat")}>
                npm run start'
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={() => handleNPMAction("npm run tests.bat")}>
                npm run test
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={() => handleNPMAction("npm run test.bat")}>
                npm run specific test
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={() => handleNPMAction("npm install.bat")}>
                npm i
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button onClick={() => handleNPMAction("npm run tsc.bat")}>
                npm run tsc
              </Button>
            </ListGroup.Item>

            {/* Add more ListGroup items with corresponding script names */}
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default NPMCard;
