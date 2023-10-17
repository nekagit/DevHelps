import { Badge, Flex } from "@mantine/core";
import { IBadge } from "../../interfaces/IBadge";
interface IProps {
  badges?: IBadge[];
  accessToken:string;
}
  function FormBadges(props: IProps) {
  const { badges, accessToken } = props;
  console.log(accessToken)
  const setConditions = () =>{
    badges?.map(x => x.key == "accessToken" ? x.condition = accessToken.length > 1 : x)
  }
  setConditions()
  return (
    <>
      <Flex
        gap="sm"
        justify="space-around"
        align="flex-end"
        direction="row"
        wrap="wrap"
      >
        {badges?.map((badge) => (
          <div key={badge.key}>
            <Badge
              key={badge.key}
              size="xl"
              variant="gradient"
              gradient={
                badge.condition
                  ? { from: "green", to: "green", deg: 90 }
                  : { from: "red", to: "red", deg: 90 }
              }
            >
              {badge.name}
            </Badge>
            </div>
        ))}
        </Flex>
    </>
  );
}
export default FormBadges;
