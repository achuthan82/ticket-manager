// import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Avatar, Button, GhostSpinner } from "components/ui";
import { useRef, useState, useEffect } from "react";
import { getComments, addComment } from "utils/ticketSinglePageService";
import { useAuthContext } from "app/contexts/auth/context";
import { toast } from "sonner";
import moment from 'moment'

const TicketInfo = ({ details, ticketId }) => {
  const { user } = useAuthContext();
  const scrollRef = useRef(null);
  const priorityStyle = {
    1: { color: "text-red-500", text: "High" },
    2: { color: "text-orange-500", text: "Medium" },
    3: { color: "text-green-500", text: "Low" },
  };
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMessages = () => {
    getComments(ticketId).then((response) => {
      if (response.success) {
        console.log("Messages:", response.data);
        if (response.data.data) {
          setMessages(response.data.data);
        }
      } else {
        setMessages([]);
        console.error("Error:", response.error);
      }
    });
  };
  const sendReply = () => {
    setLoading(true);
    addComment(ticketId, message)
      .then((response) => {
        if (response.success) {
          toast.success("Comment Added!");
          setMessage(" ");
          fetchMessages();
        } else {
          toast.error("Please try again later");
        }
      })
      .catch(() => {
        toast.error("Please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
}, [messages]);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl">
          {/* Ticket info */}
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <p className="text-gray-500">Category</p>
                <p className="font-medium text-gray-900">
                  {details?.category_name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Priority</p>
                <p
                  className={`font-medium ${priorityStyle[details?.priority] ? priorityStyle[details?.priority].color : priorityStyle[1].color}`}
                >
                  {priorityStyle[details?.priority]
                    ? priorityStyle[details?.priority].text
                    : priorityStyle[1].text}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Assigned to</p>
                <p className="font-medium text-gray-900">
                  {details?.assigned_to || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Response time</p>
                <p className="font-medium text-gray-900">2 hours</p>
              </div>
            </div>
            {/* Messages */}
            <div
              className="mt-[30px] max-h-[25vh] min-h-[10vh] overflow-y-auto"
              ref={scrollRef}
            >
              <div className="bordered mt-10 space-y-6 border-gray-200">
                {/* User Message */}
                {messages && messages.length > 0 ? (
                  messages.map((item, index) => {
                    const isloggedInUser = user.id === item.created_by;
                    return (
                      <div className="flex items-start space-x-3" key={index}>
                        <Avatar
                          initialColor={
                            isloggedInUser ? "secondary" : "primary"
                          }
                          name={item.name}
                        />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {isloggedInUser ? "You" : "Admin"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {moment(item.created_at, "MM-DD-YYYY HH:mm:ss").fromNow()}
                            </span>
                          </div>
                          <div
                            className={`${isloggedInUser ? "ml-auto" : "mr-auto"} max-w-[70%] rounded-lg ${isloggedInUser ? "bg-gray-100" : "bg-[#c9e0e5]"} p-4 break-words`}
                          >
                            <p className="text-gray-700">{item.message}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex items-center justify-center">
                    <p className="text-gray-500">No Comments to show!</p>
                  </div>
                )}

                {/* Admin Response */}
                {/* <div className="flex items-start space-x-3">
                  <Avatar initialColor="success" name="Admin Support" />
                  <div className="flex-1">
                    <div className="mb-1 flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        Admin Support
                      </span>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="max-w-[70%] rounded-lg bg-[#c9e0e5] p-4 break-words">
                      <p className="text-gray-700">Hi Sarah,</p>
                      <p className="mt-2 text-gray-700">
                        {`Thank you for bringing this to our attention. I've checked your account and can confirm that your Miami territory (33101) is properly configured and active.`}
                      </p>
                      <p className="mt-2 text-gray-700">
                        {`I've identified that there was a technical issue with lead routing for this specific ZIP code that affected a small number of agents. Our technical team has now resolved this issue.`}
                      </p>
                      <p className="mt-2 text-gray-700">
                        {`You should start receiving leads from this territory within the next 24 hours. As compensation for the inconvenience, we've credited your account with 500 additional mailers for this week.`}
                      </p>
                      <p className="mt-2 text-gray-700">
                        {`Please let me know if you don't see leads coming through by tomorrow, and I'll investigate further.`}
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            {/* Reply Box */}
            <div className="mt-6 border-t pt-6">
              <h3 className="mb-3 font-medium text-gray-900">Add a reply</h3>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Type your message here..."
                className="focus:ring-atoll w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:outline-none"
                rows="4"
              ></textarea>
              <div className="mt-3 flex items-center justify-end">
                {/* <div className="flex items-center space-x-3">
                  <button className="text-gray-400 hover:text-gray-600">
                    <PaperClipIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  <span className="text-sm text-gray-500">
                    Attach files (Max 10MB)
                  </span>
                </div> */}
                <Button
                  disabled={message === "" || loading}
                  onClick={sendReply}
                  variant="default"
                  className="bg-[#2A5A9D] text-white hover:bg-[#1A3A6C]"
                >
                  {loading && <GhostSpinner className="mr-3 size-4 border-2" />}
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketInfo;
