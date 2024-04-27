import * as React from "react";
import {
  OverlayDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  Button,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { FC } from "react";

interface DocumentViewerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  FileName: string;
}

const DocumentViewer: FC<DocumentViewerProps> = (props) => {
  const {  open, setOpen, FileName } = props;
  return (
    <div>
      <OverlayDrawer
        size="large"
        position="end"
        open={open}
        onOpenChange={(_, state) => setOpen(state.open)}
      >
        <DrawerHeader>
          <DrawerHeaderTitle
            action={
              <Button
                appearance="subtle"
                aria-label="Close"
                icon={<Dismiss24Regular />}
                onClick={() => setOpen(false)}
              />
            }
          >
            {FileName}
          </DrawerHeaderTitle>
        </DrawerHeader>

        <DrawerBody>
          <p>Drawer content</p>
        </DrawerBody>
      </OverlayDrawer>
    </div>
  );
};

export default DocumentViewer;
