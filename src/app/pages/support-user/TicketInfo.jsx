import {
  ArrowsPointingOutIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Avatar, Button, GhostSpinner } from "components/ui";
import { useRef, useState, useEffect, useMemo } from "react";
import {
  getComments,
  addComment,
  uploadSupportDocument,
  getSupportDocuments,
} from "utils/ticketSinglePageService";
import { useAuthContext } from "app/contexts/auth/context";
import { toast } from "sonner";
import moment from "moment";

const TicketInfo = ({ details, ticketId }) => {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [uploading, setUploading] = useState(false);
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
  const [documents, setDocuments] = useState([]);
  const currentUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("userData");
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return {
        id: parsed?.id,
        name: parsed?.name,
        role: parsed?.role_id,
      };
    } catch (err) {
      console.error("Failed to parse userData:", err);
      return {};
    }
  }, []);

  const fetchMessages = async () => {
    getComments(ticketId).then((response) => {
      if (response.success) {
        if (response.data.data) {
          setMessages(response.data.data);
        }
      } else {
        setMessages([]);
        console.error("Error:", response.error);
      }
    });

    const docsRes = await getSupportDocuments(ticketId);

    if (docsRes.success && docsRes.data.status === 200) {
      setDocuments(docsRes.data?.data || []);
    } else if (docsRes.status === 204) {
      setDocuments([]);
      toast.error(`Failed to load documents: ${docsRes.error}`);
    } else {
      toast.info("No documents found");
    }
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

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    setUploading(true);
    const result = await uploadSupportDocument(ticketId, file);

    if (result.success && result.data.status === 201) {
      toast.success("Document uploaded successfully!");
      // getSupportDocuments(ticketId);
      fetchMessages();
      setFile(null);
    } else {
      toast.error(`Upload failed: ${result.error}`);
    }
    setUploading(false);
  };
  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    // fetchMessages()
  }, [messages, documents]);
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
                  className={`font-medium ${priorityStyle[details?.priority] ? priorityStyle[details?.priority].color : "text-gray-500"}`}
                >
                  {priorityStyle[details?.priority]
                    ? priorityStyle[details?.priority].text
                    : "N/A"}
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
              {documents.map((doc, index) => {
                const isImage = /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(
                  doc.name,
                );
                // const isloggedInUser = user.id === item.created_by;

                return (
                  <div
                    key={`doc-${index}`}
                    className="group relative flex items-start justify-end gap-3"
                  >
                    <div className="flex max-w-[70%] flex-col">
                      <div className="mb-1 flex justify-end text-xs text-gray-400">
                        {/* <span className="font-medium text-gray-900">You</span> */}
                        {/* <span> • just now</span> */}
                      </div>

                      <div className="ml-auto rounded-xl mt-3 bg-gray-200 p-2 shadow-sm hover:bg-gray-300">
                        {isImage ? (
                          <div className="group relative mt-2 inline-block">
                            <img
                              className="max-h-[250px] max-w-[300px] rounded object-cover"
                              src={doc.url}
                              alt={doc.name}
                            />

                            <div
                              className="absolute inset-0 flex cursor-pointer items-center justify-center rounded bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                              onClick={() => setPreviewImage(doc.url)}
                            >
                              <ArrowsPointingOutIcon className="h-10 w-10 text-white drop-shadow-lg" />
                            </div>
                          </div>
                        ) : (
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate text-blue-600 underline hover:text-blue-800"
                            title={doc.name}
                          >
                            {doc.name}
                          </a>
                        )}
                      </div>
                    </div>

                    <Avatar
                      initialColor={currentUser ? "secondary" : "primary"}
                      name={currentUser?.name || "You"}
                    />
                  </div>
                );
              })}
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
                            {/* <span className="font-medium text-gray-900">
                              {isloggedInUser ? "You" : "Admin"}
                            </span> */}
                            <span className="text-xs text-gray-500">
                              {moment(
                                item.created_at,
                                "MM-DD-YYYY HH:mm:ss",
                              ).fromNow()}
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
                  disabled={uploading}
                >
                  <PaperClipIcon className="h-5 w-5" />
                  <span className="text-sm">
                    {file ? file.name : "Attach file"}
                  </span>
                </button>

                {/* Upload file button */}
                {file && (
                  <Button
                    disabled={uploading}
                    onClick={handleFileUpload}
                    variant="default"
                    className="bg-green-600 text-white hover:bg-green-800"
                  >
                    {uploading && (
                      <GhostSpinner className="mr-3 size-4 border-2" />
                    )}
                    Upload
                  </Button>
                )}

                {/* Send reply button */}
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
        {previewImage && (
          <div className="bg-opacity-70 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="">
              <img
                src={previewImage}
                alt="preview"
                className="h-96 w-fit rounded-lg shadow-lg"
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
