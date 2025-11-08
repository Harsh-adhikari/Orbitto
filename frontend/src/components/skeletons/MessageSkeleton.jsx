// work of this module -> Skeleton = fake message shapes shown until real data (messages) arrive.
const MessageSkeleton = () => {

  const skeletonMessages = Array(6).fill(null); // create a empty array with 6 null val

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (  // here map loop over 6 null value and idx is our key 
        <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
          <div className="chat-image avatar">
            <div className="size-10 rounded-full">
              <div className="skeleton w-full h-full rounded-full" />
            </div>
          </div>

          <div className="chat-header mb-1">
            <div className="skeleton h-4 w-16" />
          </div>

          <div className="chat-bubble bg-transparent p-0">
            <div className="skeleton h-16 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;