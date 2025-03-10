import { useParams } from "react-router-dom";
import CommandList from "../components/command/CommandList";

export default function Commands() {
  const { platformId } = useParams();

  if (!platformId) return <div>Platform ID is required</div>;

  return (
    <div>
      <CommandList platformId={platformId}></CommandList>
    </div>
  );
}
