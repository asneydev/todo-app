import { Todo } from "@/app/types/types";
import { blobConverter } from "@/utils/blobConverter";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Divider,
} from "@nextui-org/react";

export default function TodoItem<FC>({
  title,
  description,
  priority,
  audio,
}: Readonly<Todo>) {
  const { b64toBlob } = blobConverter();
  //TODO: get priority typeof in Todo
  const getPiorityColor = (priority: string) => {
    if (priority === "low") {
      return "green-300";
    }
    if (priority === "medium") {
      return "blue-500";
    }

    return "red-500";
  };

  return (
    <li>
      <Card
        className={`w-full border-${getPiorityColor(priority)} my-4 relative`}
      >
        {!!title && (
          <>
            <CardHeader className="flex gap-3">
              <h4 className="capitalize font-bold text-lg">{title}</h4>
            </CardHeader>
            <Divider />
          </>
        )}

        <CardBody>
          {!!description && (
            <div className="flex row">
              <div className="items-center self-center pr-4">
                <Checkbox defaultSelected size="sm"></Checkbox>
              </div>
              <div className="">
                <p className="text-sm">{description}</p>
              </div>
            </div>
          )}
          {audio && audio.length > 0 && (
            <>
              {audio.map((record) => (
                <div className="record" key={record.key}>
                  <audio
                    controls
                    src={window.URL.createObjectURL(b64toBlob(record.audio))}
                  />
                </div>
              ))}
            </>
          )}
        </CardBody>
        <Divider />
      </Card>
    </li>
  );
}
