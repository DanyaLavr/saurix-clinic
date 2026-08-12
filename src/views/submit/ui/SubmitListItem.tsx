interface IProps {
  title: string;
  data: string;
}
const SubmitListItem = ({ title, data }: IProps) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-100 pb-3">
      <span className="text-gray-500 text-sm">{title}</span>
      <span className="text-gray-900 font-medium">{data}</span>
    </div>
  );
};

export default SubmitListItem;
