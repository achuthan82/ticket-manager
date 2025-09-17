import {
  ArrowsPointingOutIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, GhostSpinner, Skeleton } from "components/ui";
import { useRef, useState, useEffect } from "react";
import {
  getComments,
  addComment,
  uploadSupportDocument,
  // getSupportDocuments,
} from "utils/ticketSinglePageService";
import { useAuthContext } from "app/contexts/auth/context";
import { toast } from "sonner";
import moment from "moment";

const TicketInfo = ({ details, ticketId, infoLoading }) => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { user } = useAuthContext();
  const scrollRef = useRef(null);

  const priorityStyle = {
    1: { color: "text-red-500", text: "Low" },
    2: { color: "text-orange-500", text: "Medium" },
    3: { color: "text-green-500", text: "High" },
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  // const [documents, setDocuments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
   const messagesContainerRef = useRef(null);
   const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMessages = async () => {
    getComments(ticketId).then((response) => {
      if (response.success) {
        if (response.data.data) {
          // Reverse so newest is at the bottom
          setMessages(response.data.data.reverse());
        }
      } else {
        setMessages([]);
        console.error("Error:", response.error);
      }
    });

    // const docsRes = await getSupportDocuments(ticketId);

    // if (docsRes.success && docsRes.data.status === 200) {
    //   setDocuments(docsRes.data?.data || []);
    // } else {
    //   // Always set empty array if API fails or no docs
    //   setDocuments([]);
    //   // Optionally log error, but don't show toast
    //   console.error(
    //     "Failed to load documents",
    //     docsRes.error || "No documents",
    //   );
    // }
  };
  // const sendReply = () => {
  //   setLoading(true);
  //   addComment(ticketId, message)
  //     .then((response) => {
  //       if (response.success) {
  //         toast.success("Comment Added!");
  //         setMessage(" ");
  //         fetchMessages();
  //       } else {
  //         toast.error("Please try again later");
  //       }
  //     })
  //     .catch(() => {
  //       toast.error("Please try again later");
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const sendReply = async () => {
    if (!ticketId) return;
    if (!message.trim() && !file) {
      toast.error("Please enter a message or attach a file");
      return;
    }

    setLoading(true);

    try {
      // 1. Handle text
      if (message.trim()) {
        const res = await addComment(ticketId, message);
        if (
          !(res.success && (res.data.status === 200 || res.data.status === 201))
        ) {
          toast.error(`Failed to add comment: ${res.error}`);
          return;
        }
      }

      // 2. Handle file
      if (file) {
        const uploadResult = await uploadSupportDocument(ticketId, file);
        if (
          uploadResult.success &&
          (uploadResult.data.status === 200 || uploadResult.data.status === 201)
        ) {
          toast.success("File uploaded successfully!");
          setFile(null);
        } else {
          toast.error(`Upload failed: ${uploadResult.error}`);
          return;
        }
      }

      // 3. Reset + refresh
      setMessage("");
      fetchMessages();
    } catch (err) {
      toast.error(`Something went wrong. Please try again later. ${err}`);
    } finally {
      setLoading(false);
    }
  };

   const handleLoadMore = () => {
    if (!messagesContainerRef.current) return;

    const container = messagesContainerRef.current;
    const prevScrollHeight = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    setIsLoadingMore(true); // flag that we're loading older messages
    setVisibleCount((prev) => prev + 20);

    setTimeout(() => {
      const newScrollHeight = container.scrollHeight;
      container.scrollTop =
        prevScrollTop + (newScrollHeight - prevScrollHeight);
      setIsLoadingMore(false); // reset after adjusting scroll
    }, 0);
  };

  useEffect(() => {
    fetchMessages();
  }, []);
 const prevCommentsLength = useRef(messages.length);

useEffect(() => {
  if (!isLoadingMore && messages.length > prevCommentsLength.current) {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  prevCommentsLength.current = messages.length;
}, [messages, isLoadingMore]);
  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl">
          {/* Ticket info */}

          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              {/* Category */}
              <div>
                <p className="text-gray-500">Category</p>
                {infoLoading ? (
                  <Skeleton className="h-4 w-20 rounded" />
                ) : (
                  <p className="font-medium text-gray-900">
                    {details?.category_name || "Not Assigned"}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div>
                <p className="text-gray-500">Priority</p>
                {infoLoading ? (
                  <Skeleton className="h-4 w-16 rounded" />
                ) : (
                  <p
                    className={`font-medium ${
                      priorityStyle[details?.priority]
                        ? priorityStyle[details?.priority].color
                        : "text-gray-500"
                    }`}
                  >
                    {priorityStyle[details?.priority]
                      ? priorityStyle[details?.priority].text
                      : "Not Assigned"}
                  </p>
                )}
              </div>

              {/* Assigned to */}
              <div>
                <p className="text-gray-500">Assigned to</p>
                {infoLoading ? (
                  <Skeleton className="h-4 w-24 rounded" />
                ) : (
                  <p className="font-medium text-gray-900">
                    {details?.assigned_to || "Not Assigned"}
                  </p>
                )}
              </div>

              {/* Response time */}
              <div>
                <p className="text-gray-500">Response time</p>
                {infoLoading ? (
                  <Skeleton className="h-4 w-20 rounded" />
                ) : (
                  <p className="font-medium text-gray-900">2 hours</p>
                )}
              </div>
            </div>
            {/* Messages */}
            <div
            ref={messagesContainerRef}
              className="mt-[30px] max-h-[25vh] min-h-[10vh] overflow-y-auto"
             
            >
              <div className="bordered mt-10 space-y-6 border-gray-200">
                {/* User Message */}

                {messages.length > visibleCount && (
                  <div className="my-3 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="rounded bg-gray-200 px-3 py-1 text-sm text-gray-700 hover:bg-gray-300"
                    >
                      Load More
                    </button>
                  </div>
                )}
                {messages && messages.length > 0 ? (
                  messages.slice(-visibleCount).map((item, index) => {
                    const isloggedInUser = user.id === item.created_by;
                    const isImage = /\.(jpg|jpeg|png|gif|svg)$/i.test(
                      item.attachment,
                    );
                    const isPdf = /\.pdf$/i.test(item.attachment);
                    const isDoc = /\.(doc|docx)$/i.test(item.attachment);
                    const isDocx = /\.(doc|docx)$/i.test(item.attachment_url);
                    const bubbleClass = `
                   ${isloggedInUser ? "ml-auto bg-gray-100" : "mr-auto bg-[#c9e0e5]"} 
                             max-w-[70%] rounded-lg p-4 break-words
                                   `;

                    return (
                      <div
                         ref={scrollRef}
                      className="flex items-start space-x-3" key={index}>
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
                              {moment(
                                item.created_at,
                                "MM-DD-YYYY HH:mm:ss",
                              ).fromNow()}
                            </span>
                          </div>
                          <div className={bubbleClass}>
                            <p className="text-gray-700">{item.message}</p>

                            {/* Attachment (if available) */}
                            {item.attachment && item.attachment !== "false" && (
                              <div>
                                <div>
                                  {isImage ? (
                                    //  Image Preview
                                    <div className="group relative mt-2 inline-block">
                                      <img
                                        className="max-h-[250px] max-w-[300px] rounded object-cover"
                                        src={item.attachment_url}
                                        alt={item.attachment}
                                      />
                                      <div
                                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                        onClick={() =>
                                          setPreviewImage(item.attachment_url)
                                        }
                                      >
                                        <ArrowsPointingOutIcon className="h-10 w-10 text-white drop-shadow-lg" />
                                      </div>
                                    </div>
                                  ) : isPdf ? (
                                    //  Inline PDF Preview
                                    <div className="group relative mt-2 inline-block">
                                      <iframe
                                        src={item.attachment_url}
                                        title={item.attachment}
                                        className="max-h-[250px] max-w-[300px] rounded border shadow"
                                      />
                                      <div
                                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                        onClick={() =>
                                          window.open(
                                            item.attachment_url,
                                            "_blank",
                                          )
                                        }
                                      >
                                        <ArrowsPointingOutIcon className="h-10 w-10 text-white drop-shadow-lg" />
                                      </div>
                                      <div className="mt-1 truncate text-xs text-gray-700">
                                        {item.attachment.replace(
                                          /^[a-z0-9-]+_/,
                                          "",
                                        )}
                                      </div>
                                    </div>
                                  ) : isDoc ? (
                                    <div className="group relative mt-2 inline-block">
                                      <iframe
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(item.attachment_url)}&embedded=true`}
                                        title={item.attachment}
                                        className="max-h-[250px] max-w-[300px] rounded border shadow"
                                      />
                                      <div
                                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                        onClick={() =>
                                          window.open(
                                            item.attachment_url,
                                            "_blank",
                                          )
                                        }
                                      >
                                        <ArrowsPointingOutIcon className="h-10 w-10 text-white drop-shadow-lg" />
                                      </div>
                                      <div className="mt-1 truncate text-xs text-gray-700">
                                        {item.attachment.replace(
                                          /^[a-z0-9-]+_/,
                                          "",
                                        )}
                                      </div>
                                    </div>
                                  ) : isDocx ? (
                                    <div className="group relative mt-2 inline-block">
                                      <iframe
                                        src={`https://docs.google.com/gview?url=${encodeURIComponent(item.attachment_url)}&embedded=true`}
                                        title={item.attachment}
                                        className="max-h-[250px] max-w-[300px] rounded border shadow"
                                      />
                                      <div
                                        className="absolute inset-0 flex cursor-pointer items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                        onClick={() =>
                                          window.open(
                                            item.attachment_url,
                                            "_blank",
                                          )
                                        }
                                      >
                                        <ArrowsPointingOutIcon className="h-10 w-10 text-white drop-shadow-lg" />
                                      </div>
                                      <div className="mt-1 truncate text-xs text-gray-700">
                                        {item.attachment.replace(
                                          /^[a-z0-9-]+_/,
                                          "",
                                        )}
                                      </div>
                                    </div>
                                  ) : (
                                    //  Other files
                                    <a
                                      href={item.attachment_url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="truncate text-blue-600 underline hover:text-blue-800"
                                      title={item.attachment}
                                    >
                                      {item.attachment}
                                    </a>
                                  )}
                                </div>
                              </div>
                            )}
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
              </div>
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
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="mt-3 flex items-center justify-end space-x-3">
                {/* Attach file button */}
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
                  onClick={() => fileInputRef.current.click()}
                  disabled={loading}
                >
                  <PaperClipIcon className="h-5 w-5" />
                  <span className="text-sm">
                    {file ? file.name : "Attach file"}
                  </span>
                </button>

                {/* Cancel attached file */}
                {file && (
                  <XMarkIcon
                    className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => setFile(null)}
                  />
                )}

                {/* Send reply button */}
                <Button
                  disabled={(message.trim() === "" && !file) || loading}
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
        {previewImage && (
          <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div
              className={`rounded-lg shadow-lg ${
                previewImage.toLowerCase().endsWith(".svg")
                  ? "bg-white p-4"
                  : ""
              }`}
            >
              <img
                src={previewImage}
                alt="preview"
                className={`h-96 w-fit rounded-lg ${
                  previewImage.toLowerCase().endsWith(".svg") ? "" : ""
                }`}
              />
              <XMarkIcon
                className="absolute top-2 right-2 h-8 w-8 cursor-pointer bg-white text-black"
                onClick={() => setPreviewImage(null)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default TicketInfo;
