import React from "react";
import { FC } from "react";
import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
} from "@fluentui/react-components";
import { makeStyles, shorthands, Text } from "@fluentui/react-components";
import { Edit20Regular, Delete20Regular } from "@fluentui/react-icons";
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from "@fluentui/react-components";


const useStyles = makeStyles({
  container: {
    ...shorthands.gap("16px"),
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
});
const SELECTION_MODE = "multiselect"; 

type CustomItem = HeadlessFlatTreeItemProps & { content: string };

interface TopicModalProps {
  items: CustomItem[] | undefined;
}
const TopicModal: FC<TopicModalProps> = (props) => {
  const { items } = props;
  const flatTree = useHeadlessFlatTree_unstable(items!, {
    selectionMode: SELECTION_MODE,
  });
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Text size={500} weight="semibold" align="center">
        Edit Template
      </Text>

      <FlatTree {...flatTree.getTreeProps()} aria-label="Selection">
        {Array.from(flatTree.items(), (flatTreeItem) => {
          const { content, ...treeItemProps } = flatTreeItem.getTreeItemProps();
          const level = treeItemProps["aria-level"];
    const value = treeItemProps.value as string;
    const isItemRemovable = level !== 1 && !value.endsWith("-btn");
          return (
            <FlatTreeItem {...treeItemProps} key={flatTreeItem.value} >
              <TreeItemLayout 
              actions={
                isItemRemovable ? (
                  <>
                  <Button
                    aria-label="Edit"
                    appearance="subtle"
                    icon={<Edit20Regular primaryFill="blue"  />}
                  />
                   <Button
                    aria-label="Delete"
                    appearance="subtle"
                    icon={<Delete20Regular primaryFill="red" />}
                  />
                </>
                ) : undefined      
              }
              >{content}</TreeItemLayout>
            </FlatTreeItem>
          );
        })}
      </FlatTree>
    </div>
  );
};

export default TopicModal;
