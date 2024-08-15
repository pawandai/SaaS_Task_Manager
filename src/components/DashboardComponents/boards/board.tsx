import { deleteBoard } from "@/actions";
import FormDelete from "./formDelete";

interface BoardProps {
  title: string;
  id: string;
}

const Board = ({ title, id }: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);

  return (
    <form key={id} action={deleteBoardWithId}>
      <div>
        {title} <FormDelete />
      </div>
    </form>
  );
};

export default Board;
