import { Avatar } from "../../../../../components/ui/avatar";

interface NotificationItem {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  type: string;
  timestamp: string;
  dateGroup: string;
}

const Notifications = () => {
    
  // Mock data - replace with actual data from your API
  const notifications: NotificationItem[] = [
    {
      id: 1,
      user: {
        name: "Ronaldo",
        avatar: "/path-to-avatar.jpg",
      },
      type: "follow",
      timestamp: "1d",
      dateGroup: "Yesterday",
    },
    {
      id: 2,
      user: {
        name: "Messi",
        avatar: "/path-to-avatar.jpg",
      },
      type: "like",
      timestamp: "2d",
      dateGroup: "This Week",
    },
    {
      id: 3,
      user: {
        name: "Neymar",
        avatar: "/path-to-avatar.jpg",
      },
      type: "comment",
      timestamp: "1w",
      dateGroup: "Earlier",
    },
  ];

  // Group notifications by date category
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const group = notification.dateGroup;
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(notification);
    return acc;
  }, {} as Record<string, NotificationItem[]>);

  const getNotificationMessage = (type: string) => {
    switch (type) {
      case "follow":
        return "started following you";
      case "like":
        return "liked your post";
      case "comment":
        return "commented on your post";
      default:
        return "interacted with you";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Notifications</h2>

      {Object.entries(groupedNotifications).map(([dateGroup, items]) => (
        <div key={dateGroup} className="mb-6 last:mb-0">
          <h3 className="font-semibold text-gray-700 mb-3 px-2">{dateGroup}</h3>
          <div className="space-y-3">
            {items.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 p-3 
                rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Avatar />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">
                      {notification.user.name}
                    </span>{" "}
                    {getNotificationMessage(notification.type)}{" "}
                    <span className="text-gray-500 text-xs">
                      {notification.timestamp}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;