import { Card, ListGroup } from "react-bootstrap";

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
            <ListGroup.Item>git create Branch from develop</ListGroup.Item>

            <ListGroup.Item>git sync all with develop</ListGroup.Item>
            <ListGroup.Item>git commit as "new Implementation"</ListGroup.Item>
            <ListGroup.Item>git commit as "Update" + Reason</ListGroup.Item>
            <ListGroup.Item>
              git commit as Comments or Tests failed
            </ListGroup.Item>
            <ListGroup.Item>git push</ListGroup.Item>
            <ListGroup.Item>git pull</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  );
}

export default BasicCard;
