import { Card } from "react-bootstrap";

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
      </Card>
    </>
  );
}

export default BasicCard;
