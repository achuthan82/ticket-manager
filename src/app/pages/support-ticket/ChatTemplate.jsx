import { Avatar, Button, Input, ScrollShadow, Select } from "components/ui";
import {
  ArrowUpTrayIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  // InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import {
  editSupportTicketStatus,
  getSupportTickets,
  addSupportComment,
  getComments,
  getSupportTicketAssignees,
  deleteComment,
  editComment,
  assignSupportTicket,
  uploadSupportDocument,
  getSupportDocuments,
} from "../../../utils/SupportTicketService";
import { toast } from "sonner";
import moment from "moment";

const ChatTemplate = ({ refreshTickets }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [replyMessage, setReplyMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [assignees, setAssignees] = useState([]);
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingMessage, setEditingMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  1;
  const [documents, setDocuments] = useState([]);

  const currentUserId = useMemo(() => {
    try {
      const raw = localStorage.getItem("userData"); // ✅ localStorage
      if (!raw) return undefined;
      const parsed = JSON.parse(raw);
      console.log("Parsed userData in ChatTemplate:", parsed);
      return parsed?.id; // should be your "73ba57..." value
    } catch (err) {
      console.error("Failed to parse userData:", err);
      return undefined;
    }
  }, []);

  console.log("Current User ID in ChatTemplate:", currentUserId);

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

  const statusMap = {
    1: "New",
    2: "Open",
    3: "Pending",
    4: "Resolved",
    5: "Closed",
  };

  // 🔁 reverse mapping
  const statusLabelToNumber = Object.fromEntries(
    Object.entries(statusMap).map(([num, label]) => [label, Number(num)]),
  );

  const priorityMap = {
    1: "Low Priority",
    2: "Medium Priority",
    3: "High Priority",
  };

  // Fetch tickets
  const fetchTickets = async () => {
    setLoading(true);
    setError(null);
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone === "Asia/Calcutta") timeZone = "Asia/Kolkata";

    try {
      const response = await getSupportTickets({
        page: 1,
        per_page: 50,
        time_zone: timeZone,
      });
      if (response.success) {
        const ticketsArray = response.data?.data?.[0] || [];
        const normalizedTickets = ticketsArray.map((t) => ({
          ...t,
          statusLabel: statusMap[t.status] || "Unknown",
          priorityLabel: priorityMap[t.priority] || "Normal",
          assigneeName: t.assigned_to || "Unassigned", // 👈 use backend field
        }));

        setTickets(normalizedTickets);
        if (normalizedTickets.length > 0)
          setSelectedTicket(normalizedTickets[0]);
      } else {
        setError(response.error || "Failed to fetch tickets");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching tickets");
    }
    setLoading(false);
  };

  const fetchComments = async (ticketId) => {
    if (!ticketId) return;
    setCommentsLoading(true);
    try {
      const res = await getComments(ticketId, "Asia/Kolkata");
      if (res.success) {
        setComments(res.data || []);
      } else {
        toast.error(`❌ Failed to load comments: ${res.error}`);
      }

      // Fetch documents (assuming same ticketId)
      const docsRes = await getSupportDocuments(ticketId);
      console.log("Documents Response:", docsRes);

      if (docsRes.success) {
        setDocuments(docsRes.data?.data || docsRes.data || []);
      } else {
        toast.error(`❌ Failed to load documents: ${docsRes.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching comments");
    }
    setCommentsLoading(false);
  };

  // 🔹 Update ticket status with API call
  const handleStatusChange = async (newStatusLabel) => {
    if (!selectedTicket) return;

    const newStatusNumber = statusLabelToNumber[newStatusLabel];

    const res = await editSupportTicketStatus(
      selectedTicket.id,
      newStatusNumber,
    );

    if (res.success) {
      // ✅ Update selected ticket (right panel)
      setSelectedTicket((prev) => ({
        ...prev,
        status: newStatusNumber,
        statusLabel: newStatusLabel,
      }));

      // ✅ Update the ticket inside the left-hand tickets list
      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t.id === selectedTicket.id
            ? { ...t, status: newStatusNumber, statusLabel: newStatusLabel }
            : t,
        ),
      );

      // alert(`✅ Status changed to ${newStatusLabel}`);
      toast.success(`Ticket Status updated to ${newStatusLabel}`);
      refreshTickets?.();
    } else {
      console.error("❌ Failed to update status:", res.error);
      alert("Failed to update ticket status. Please try again.");
    }
  };

  const handleSendResponse = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    const res = await addSupportComment(selectedTicket.id, replyMessage);

    if (res.success) {
      toast.success(" Comment added successfully!");

      // Clear the text area
      setReplyMessage("");

      fetchComments(selectedTicket.id);
      refreshTickets?.();

      // (Optional) Reload messages here once we wire up "list comments"
    } else {
      toast.error(`❌ Failed to add comment: ${res.error}`);
    }
  };

  // 🔹 Fetch assignees
  const fetchAssignees = async () => {
    try {
      const res = await getSupportTicketAssignees();
      if (res.success) {
        // Store both name and id
        const assigneesData =
          res.data?.data?.map((user) => ({
            id: user.id,
            name: user.name,
          })) || [];
        setAssignees(assigneesData);
      }
    } catch (err) {
      console.error("Error fetching assignees:", err);
    }
  };

  // for delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    const res = await deleteComment(commentId);

    if (res.success) {
      toast.success("Comment deleted successfully!");
      fetchComments(selectedTicket.id); // Refresh comments after deletion
    } else {
      toast.error(`Failed to delete comment: ${res.error}`);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingMessage.trim()) return;

    const res = await editComment(editingCommentId, editingMessage);
    if (res.success) {
      // Update local comments state
      setComments((prev) =>
        prev.map((c) =>
          c.id === editingCommentId ? { ...c, message: editingMessage } : c,
        ),
      );
      setEditingCommentId(null);
      setEditingMessage("");
    } else {
      alert(res.error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setEditingMessage(comment.message);
  };

  useEffect(() => {
    fetchTickets();
    fetchAssignees(); // 👈 load names once
    if (tickets.length > 0) {
      setSelectedTicket(tickets[0]);
      fetchComments(tickets[0].id);
    }
  }, []);

  // Filter tickets by status and search query
  const filteredTickets = tickets.filter((t) => {
    const matchesFilter =
      filter === "All Status" ? true : t.statusLabel === filter;
    const matchesPriority =
      priorityFilter === "All Priority"
        ? true
        : t.priorityLabel === priorityFilter;
    const matchesSearch =
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toString().includes(searchQuery);

    const matchesAgent =
      agentFilter === "All Agents"
        ? true
        : agentFilter === "Unassigned"
          ? t.assigneeName === "Unassigned"
          : t.assigneeName === agentFilter;

    return matchesFilter && matchesPriority && matchesSearch && matchesAgent;
  });

  // const updateStatus = (newStatus) =>
  //   setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
  const updateAssignee = async (newAssignee) => {
    if (!selectedTicket) return;

    // Update UI optimistically
    setSelectedTicket((prev) => ({
      ...prev,
      assignee: newAssignee,
    }));

    // Skip if 'Unassigned'
    if (newAssignee === "Unassigned") return;

    // Find user ID for this assignee
    const assigneeObj = assignees.find((a) => a.name === newAssignee);
    const ticketOwnerId = assigneeObj?.id || newAssignee; // fallback

    try {
      const res = await assignSupportTicket(selectedTicket.id, ticketOwnerId);
      if (res.success) {
        toast.success(`Ticket assigned to ${newAssignee}`);
        refreshTickets?.(); // Refresh ticket list
      } else {
        toast.error(`Failed to assign ticket: ${res.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Error assigning ticket");
    }
  };

  return (
    <div className="mx-auto flex h-screen max-h-[calc(100vh-240px)] w-full max-w-screen-2xl flex-col overflow-hidden">
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Ticket List */}
        <div className="flex w-full flex-col overflow-hidden border-b border-gray-200 bg-white md:w-1/2 md:border-r md:border-b-0 lg:w-1/3">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {/* Filters + Search */}
            <div className="flex-shrink-0 border-b border-gray-200 p-3 sm:p-4">
              <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                <Input
                  className="w-full"
                  placeholder="Search Tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  className="h-10 w-full flex-shrink-0 p-2 sm:w-10"
                  variant="flat"
                  color="neutral"
                >
                  <FunnelIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
                <Select
                  className="rounded-md border border-black px-3 py-2 text-sm"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  data={[
                    { label: "All Status", value: "All Status" },
                    { label: "New", value: "New" },
                    { label: "Open", value: "Open" },
                    { label: "Pending", value: "Pending" },
                    { label: "Resolved", value: "Resolved" },
                    { label: "Closed", value: "Closed" },
                  ]}
                />

                <Select
                  className="rounded-md border border-black px-3 py-2 text-sm"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  data={[
                    "All Priority",
                    "High Priority",
                    "Medium Priority",
                    "Low Priority",
                  ]}
                />

                {/* Agents Filter */}
                <Select
                  className="rounded-md border border-black px-3 py-2 text-sm"
                  value={agentFilter}
                  onChange={(e) => setAgentFilter(e.target.value)}
                  data={[
                    { label: "All Agents", value: "All Agents" },
                    { label: "Unassigned", value: "Unassigned" },
                    ...assignees.map((a) => ({
                      label: a.name,
                      value: a.name,
                    })),
                  ]}
                />
              </div>
            </div>

            {/* Tickets Scroll */}
            <ScrollShadow className="hide-scrollbar flex-1 space-y-4 overflow-y-auto">
              {loading && (
                <p className="p-4 text-gray-500">Loading tickets...</p>
              )}
              {error && <p className="p-4 text-red-500">{error}</p>}
              {!loading && !error && filteredTickets.length === 0 && (
                <p className="p-4 text-gray-500">No tickets found.</p>
              )}
              {!loading &&
                !error &&
                filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => {
                      setSelectedTicket(ticket);
                      fetchComments(ticket.id); // 👈 fetch comments when selecting
                    }}
                    className={`group cursor-pointer border border-gray-200 p-2 shadow-sm transition-all duration-200 ${selectedTicket?.id === ticket.id ? "border-blue-400 bg-blue-50" : "bg-white hover:-translate-y-1 hover:shadow-md"} `}
                  >
                    <div className="group cursor-pointer border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">
                      <div className="mb-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                        <div>
                          <p className="text-sm font-semibold text-gray-900 sm:text-base">
                            #{ticket.id} – {ticket.subject}
                          </p>
                          <p className="text-xs text-gray-500 sm:text-sm">
                            {ticket.name}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-[11px] font-medium sm:text-xs ${
                            ticket.statusLabel === "Open"
                              ? "bg-yellow-100 text-yellow-800"
                              : ticket.statusLabel === "Pending"
                                ? "bg-purple-100 text-purple-800"
                                : ticket.statusLabel === "Resolved"
                                  ? "bg-green-100 text-green-800"
                                  : ticket.statusLabel === "New"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {ticket.statusLabel}
                        </span>
                      </div>
                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-700">
                        {ticket.description || "No description provided"}
                      </p>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        {/* First line: Time and Priority */}
                        <div className="flex justify-between">
                          <span>{moment(ticket.created_at).fromNow()}</span>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-medium sm:text-xs ${
                              ticket.priorityLabel === "High Priority"
                                ? "text-red-600"
                                : ticket.priorityLabel === "Medium Priority"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          >
                            {ticket.priorityLabel}
                          </span>
                        </div>

                        {/* Second line: Assigned To */}

                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          {ticket.assigneeName &&
                          ticket.assigneeName !== "Unassigned" ? (
                            <>
                              <Avatar
                                initialColor="auto"
                                size={5} // small avatar
                                name={ticket.assigneeName}
                                title={ticket.assigneeName} // tooltip
                              />
                              <span
                                className="truncate"
                                title={ticket.assigneeName}
                              >
                                Assigned to {ticket.assigneeName}
                              </span>
                            </>
                          ) : (
                            <span className="truncate text-gray-400">
                              Unassigned
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </ScrollShadow>
          </div>
        </div>

        {/* Ticket Details */}
        <div className="flex w-full flex-1 flex-col overflow-hidden bg-white">
          {selectedTicket && (
            <>
              {/* Ticket Info Header */}
              <div className="flex-shrink-0 border border-gray-200 bg-white p-2 sm:p-3 md:p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm font-semibold text-gray-900 sm:text-base md:text-lg">
                      #{selectedTicket.id}-{selectedTicket.subject}
                    </h4>

                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4">
                      <div className="flex w-full items-center sm:w-auto">
                        <Avatar
                          initialColor="info"
                          className="mr-2 h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
                          name={selectedTicket.name}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-900 sm:text-sm md:text-base">
                            {selectedTicket.name}
                          </p>

                          {/* email + created + priority in ONE line */}
                          <div className="flex items-center gap-x-2 text-[10px] text-gray-500 sm:text-xs md:text-sm">
                            {/* truncate only email */}
                            <p className="max-w-[120px] truncate sm:max-w-[200px] md:max-w-[250px]">
                              {selectedTicket.email}
                            </p>

                            <span className="hidden sm:inline">•</span>

                            {/* keep created + priority together */}
                            <div className="flex items-center gap-x-2 whitespace-nowrap">
                              <span>
                                Created{" "}
                                {moment(selectedTicket.created_at).fromNow()}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span
                                className={`font-medium ${
                                  selectedTicket.priorityLabel ===
                                  "High Priority"
                                    ? "text-red-600"
                                    : selectedTicket.priorityLabel ===
                                        "Medium Priority"
                                      ? "text-yellow-600"
                                      : "text-green-600"
                                }`}
                              >
                                {selectedTicket.priorityLabel || "Normal"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto">
                    <div className="flex w-full items-center space-x-2 sm:w-auto">
                      <label className="shrink-0 text-xs font-medium text-gray-700 sm:text-sm">
                        Status:
                      </label>
                      <Select
                        value={selectedTicket.statusLabel}
                        data={["New", "Open", "Pending", "Resolved", "Closed"]}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="flex-1 text-xs sm:flex-none sm:text-sm"
                      />
                    </div>
                    <div className="flex w-full items-center space-x-2 sm:w-auto">
                      <label className="shrink-0 text-xs font-medium text-gray-700 sm:text-sm">
                        Assign to:
                      </label>
                      <Select
                        value={selectedTicket.assignee || "Unassigned"}
                        data={["Unassigned", ...assignees.map((a) => a.name)]} // show names only
                        onChange={(e) => updateAssignee(e.target.value)}
                        className="flex-1 text-xs sm:flex-none sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Messaging Section */}
              <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="relative max-h-screen flex-1 overflow-y-auto">
                  <div
                    orientation="vertical"
                    className="h-full w-full overflow-y-auto"
                  >
                    <div className="space-y-2 p-2 sm:space-y-3 sm:p-3 md:p-4 lg:p-6">
                      {/* 🔹 Render uploaded documents here */}
                      {documents.length > 0 && (
                        <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-3">
                          <h5 className="mb-2 text-sm font-semibold text-gray-700">
                            Uploaded Documents
                          </h5>
                          <ul className="flex flex-col gap-2">
                            {documents.map((doc, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <a
                                  href={doc.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="truncate text-blue-600 underline hover:text-blue-800"
                                  title={doc.name}
                                >
                                  {doc.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {commentsLoading && (
                        <p className="text-gray-500">Loading comments...</p>
                      )}
                      {!commentsLoading && comments.length === 0 && (
                        <p className="text-gray-500">No comments yet.</p>
                      )}
                      {/* const currentUserId = userData.id; // from your stored
                      userData */}
                      {comments.map((comment) => {
                        const isAdmin = comment.created_by === currentUserId;

                        return (
                          <div
                            key={comment.id}
                            className={`group relative flex items-start gap-3 ${
                              isAdmin ? "justify-end" : "justify-start"
                            }`} // <-- group moved here
                          >
                            {/* Avatar on the side */}
                            {!isAdmin && (
                              <Avatar
                                initialColor="info"
                                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                                name={comment.name}
                              />
                            )}

                            {/* Bubble + icons */}
                            <div className="flex max-w-[70%] flex-col">
                              {/* Time + Name */}
                              <div
                                className={`mb-1 flex items-center gap-2 text-xs text-gray-400 ${
                                  isAdmin
                                    ? "justify-end text-right"
                                    : "justify-start text-left"
                                }`}
                              >
                                <span>
                                  {moment(comment.created_at).fromNow()}
                                </span>
                                <span className="font-medium text-gray-900">
                                  {comment.name}
                                </span>
                              </div>

                              {/* Message Bubble */}
                              <div
                                className={`rounded-xl p-3 break-words shadow-sm transition-all duration-300 sm:p-4 ${
                                  isAdmin
                                    ? "ml-auto bg-teal-100 text-right hover:bg-teal-200"
                                    : "bg-gray-100 text-left hover:bg-gray-200"
                                }`}
                              >
                                {editingCommentId === comment.id ? (
                                  <div className="flex flex-col gap-2 sm:flex-row">
                                    <input
                                      type="text"
                                      value={editingMessage}
                                      onChange={(e) =>
                                        setEditingMessage(e.target.value)
                                      }
                                      className="flex-1 rounded-md border border-gray-300 p-2 text-sm transition-all duration-200 focus:ring-2 focus:ring-teal-300 focus:outline-none"
                                    />
                                    <div className="mt-2 flex gap-2 sm:mt-0">
                                      <button
                                        onClick={handleSaveEdit}
                                        className="rounded bg-teal-500 px-3 py-1 text-white transition-colors hover:bg-teal-600"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() =>
                                          setEditingCommentId(null)
                                        }
                                        className="rounded border border-gray-300 px-3 py-1 text-gray-600 transition-colors hover:bg-gray-200"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="whitespace-pre-wrap">
                                    {comment.message}
                                  </p>
                                )}
                              </div>

                              {/* Edit/Delete icons slightly below bubble */}
                              {isAdmin && editingCommentId !== comment.id && (
                                <div className="mt-1 ml-auto flex justify-end gap-2 text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                  <button
                                    className="hover:text-gray-700"
                                    onClick={() => handleEditComment(comment)}
                                    title="Edit"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    className="hover:text-red-600"
                                    onClick={() =>
                                      handleDeleteComment(comment.id)
                                    }
                                    title="Delete"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* Avatar for current user on the side */}
                            {isAdmin && (
                              <Avatar
                                initialColor="success"
                                className="mt-4 h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                                name={comment.name}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Reply Section */}
              {/* Reply Section */}
              <div className="flex-1 border-t border-gray-300 bg-white p-2 sm:p-3 md:p-4">
                <div className="flex w-full flex-col sm:flex-row sm:items-start sm:space-x-3">
                  {/* Avatar */}
                  <div className="mb-2 flex flex-shrink-0 justify-center sm:mb-0 sm:justify-start">
                    <Avatar
                      initialColor="info"
                      className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10"
                      name={currentUser?.name || "You"}
                    />
                  </div>

                  {/* Input & Actions */}
                  <div className="flex flex-1 flex-col">
                    <textarea
                      placeholder="Type your response..."
                      className="focus:ring-atoll w-full resize-none rounded-lg border border-gray-400 px-2 py-2 text-sm focus:ring-2 focus:outline-none sm:px-3 sm:py-2 sm:text-sm md:px-4 md:py-3 md:text-base"
                      rows="3"
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                    ></textarea>

                    <div className="mt-3 flex flex-col gap-2 sm:mt-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-2">
                        {/* File Upload */}
                        {/* Hidden File Input */}

                        <input
                          type="file"
                          id="fileUpload"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            setSelectedFile(file); // ✅ preview only
                            console.log("File selected:", file);
                          }}
                        />

                        {/* Upload Button + File Preview */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="flat"
                            className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                            onClick={() =>
                              document.getElementById("fileUpload").click()
                            }
                          >
                            <ArrowUpTrayIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </Button>

                          {/* Show selected file name + remove option */}
                          {selectedFile && (
                            <div className="flex items-center gap-2">
                              <span className="max-w-[150px] truncate text-xs text-gray-600 sm:max-w-[200px] sm:text-sm md:max-w-[250px]">
                                {selectedFile.name}
                              </span>
                              <button
                                className="text-xs text-red-500 hover:text-red-700"
                                onClick={() => setSelectedFile(null)}
                              >
                                ✕
                              </button>
                              <Button
                                size="sm"
                                variant="filled"
                                color="primary"
                                className="px-2 py-1 text-xs text-white"
                                onClick={async () => {
                                  if (!selectedFile || !selectedTicket) return;

                                  try {
                                    toast.info("Uploading file...");
                                    const res = await uploadSupportDocument(
                                      selectedTicket.id,
                                      selectedFile,
                                    );
                                    if (res.success) {
                                      toast.success(
                                        "📎 File uploaded successfully!",
                                      );
                                      setSelectedFile(null); // clear after success
                                      fetchComments(selectedTicket.id);
                                    } else {
                                      toast.error(
                                        `❌ Upload failed: ${res.error}`,
                                      );
                                    }
                                  } catch (err) {
                                    console.error("Upload error:", err);
                                    toast.error(
                                      "Something went wrong while uploading.",
                                    );
                                  }
                                }}
                              >
                                Upload
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex w-full justify-end sm:w-auto">
                        <button
                          className="bg-dark-800 w-full rounded-lg px-3 py-2 text-sm text-white sm:w-auto sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3"
                          onClick={handleSendResponse}
                        >
                          Send Response
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <SonnerToaster richColors position="top-right" /> */}
    </div>
  );
};

export default ChatTemplate;
