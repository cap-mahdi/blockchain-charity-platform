export const CommentReply = () => {
  return (
    <div className="w-full flex flex-row gap-4">
      <img
        src="images/default-avatar.png"
        alt="avatar"
        className="w-10 h-10 rounded-full"
      />{' '}
      <div className="flex flex-col gap-4 flex-1 bg-light-gray rounded-md p-3">
        <div className="flex felx-row justify-between items-center">
          <p className="font-medium">Mahdi Chaabane</p>
          <p className="text-xs"> 3 hours ago</p>
        </div>
        <p>Could ues some more statistics, but that's me haha</p>
      </div>
    </div>
  );
};
