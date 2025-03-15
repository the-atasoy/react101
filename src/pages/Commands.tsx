import { useParams } from "react-router-dom";
import CommandList from "../components/command/CommandList";

export default function Commands() {
  const { platformId, platformName } = useParams();

  if (!platformId) return <div>Platform ID is required</div>;
  if (!platformName) return <div>Platform Name is required</div>;

  return (
    <div>
      <CommandList platformId={platformId} platformName={platformName}></CommandList>
    </div>
  );
}
