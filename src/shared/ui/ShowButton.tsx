import Eye from "@/src/shared/ui/icons/eye.svg";
import EyeOff from "@/src/shared/ui/icons/eye-off.svg";
import { Dispatch, SetStateAction } from "react";
interface IProps {
  isShow: boolean;
  set: Dispatch<SetStateAction<boolean>>;
  showedContent?: string;
}
const ShowButton = ({ isShow, set, showedContent = "пароль" }: IProps) => {
  return (
    <button
      type="button"
      onClick={() => set((boolean) => !boolean)}
      aria-label={
        isShow ? `Скрыть ${showedContent}` : `Показать ${showedContent}`
      }
      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-stone-400 hover:text-stone-600"
    >
      {isShow ? <Eye /> : <EyeOff />}
    </button>
  );
};

export default ShowButton;
