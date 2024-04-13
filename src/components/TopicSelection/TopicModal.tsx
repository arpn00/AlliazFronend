import React, { FC, useState, useEffect, ChangeEvent } from "react";

import {
  FlatTree,
  FlatTreeItem,
  TreeItemLayout,
  TreeOpenChangeData,
  TreeOpenChangeEvent,
  HeadlessFlatTreeItemProps,
  useHeadlessFlatTree_unstable,
  TreeItemValue,
  FlatTreeItemProps,
  TreeSelectionValue,
  TreeCheckedChangeData,
} from "@fluentui/react-components";
import { Delete20Regular } from "@fluentui/react-icons";
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
import { CommonDialog } from "../Dialog/CommonDialog.tsx";
import { QuestionnaireResponse } from "../../api/models.ts";
import { AddPrompt } from "./Prompts/AddPrompt.tsx";

type ItemProps = HeadlessFlatTreeItemProps & { content: string };



type CustomTreeItemProps = FlatTreeItemProps & {
  onRemoveItem?: (value: string) => void;
  editMode ? : boolean
};

const CustomTreeItem = React.forwardRef(
  (
    { onRemoveItem,editMode, ...props }: CustomTreeItemProps,
    ref: React.Ref<HTMLDivElement> | undefined
  ) => {
    const focusTargetAttribute = useRestoreFocusTarget();
    const level = props["aria-level"];
    const value = props.value as string;
    const isItemRemovable = level !== 1 && !value.endsWith("-btn");

    const handleRemoveItem = React.useCallback(() => {
      onRemoveItem?.(value);
    }, [value, onRemoveItem]);

    return (
      <Menu positioning="below-end" openOnContext>
        <MenuTrigger disableButtonEnhancement>
          <FlatTreeItem
            aria-description="has actions"
            {...focusTargetAttribute}
            {...props}
            ref={ref}
          >
            <TreeItemLayout
              actions={
                isItemRemovable && editMode? (
                  <>
                    <Button
                      aria-label="Remove item"
                      appearance="subtle"
                      onClick={handleRemoveItem}
                      icon={<Delete20Regular />}
                    />
                  </>
                ) : undefined
              }
            >
              {props.children}
            </TreeItemLayout>
          </FlatTreeItem>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem onClick={handleRemoveItem}>Remove item</MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  }
);

interface TopicModalProps {
  checkedItems: Map<TreeItemValue, TreeSelectionValue> | undefined;
  setCheckedItems: React.Dispatch<Map<TreeItemValue, TreeSelectionValue>>;
  trees: ItemProps[][];
  setTrees: React.Dispatch<React.SetStateAction<ItemProps[][] | undefined>>;
  editMode? : boolean;
}

export const TopicModal: FC<TopicModalProps> = (props) => {
  const { checkedItems, setCheckedItems, trees, setTrees , editMode = true} = props;
  const [showPromptDialog, setShowPromptDialog] =
    React.useState<boolean>(false);
  const [subtreeIndex, setSubtreeIndex] = React.useState<number | undefined>(
    undefined
  );
  const [newPrompt, setNewPrompt] = React.useState<string | undefined>(
    undefined
  );

  const onClose = () => {
    setShowPromptDialog(false);
  };

  const onAddPromptSave = () => {
    addFlatTreeItem(subtreeIndex);
    setNewPrompt(undefined);
    setShowPromptDialog(false);
  };
  const itemToFocusRef = React.useRef<HTMLDivElement>(null);
  const [itemToFocusValue, setItemToFocusValue] =
    React.useState<TreeItemValue>();

  const handleOpenChange = (
    event: TreeOpenChangeEvent,
    data: TreeOpenChangeData
  ) => {
    console.log(`Njan ${event} anu ${data}`);
    const value = data.value as string;
    if (value.endsWith("-btn")) {
      const subtreeIndex = Number(value[0]) - 1;
      setSubtreeIndex(subtreeIndex);
      setShowPromptDialog(true);
    }
  };

  const addFlatTreeItem = (subtreeIndex: number | undefined) =>
    setTrees((currentTrees) => {
      const lastItem =
        currentTrees![subtreeIndex!][currentTrees![subtreeIndex!].length - 1];
      const newItemValue = `${subtreeIndex! + 1}-${
        Number(lastItem.value.toString().slice(2)) + 1
      }`;
      setItemToFocusValue(newItemValue);
      const nextSubTree: ItemProps[] = [
        ...currentTrees![subtreeIndex!],
        {
          value: newItemValue,
          parentValue: currentTrees![subtreeIndex!][0].value,
          content: `${newPrompt}`,
        },
      ];

      return [
        ...currentTrees!.slice(0, subtreeIndex),
        nextSubTree,
        ...currentTrees!.slice(subtreeIndex! + 1),
      ];
    });

  const onCheckedChange = (
    event: ChangeEvent<HTMLElement>,
    data: TreeCheckedChangeData
  ) => {
    setCheckedItems(data.checkedItems);
  };
  const removeFlatTreeItem = React.useCallback(
    (value: string) =>
      setTrees((currentTrees) => {
        const subtreeIndex = Number(value[0]) - 1;
        const currentSubTree = trees[subtreeIndex];
        const itemIndex = currentSubTree.findIndex(
          (item) => item.value === value
        );
        const nextSubTree = trees[subtreeIndex].filter(
          (_item, index) => index !== itemIndex
        );

        const nextItemValue = currentSubTree[itemIndex + 1]?.value;
        const prevItemValue = currentSubTree[itemIndex - 1]?.value;
        setItemToFocusValue(nextItemValue || prevItemValue);

        return [
          ...currentTrees!.slice(0, subtreeIndex),
          nextSubTree,
          ...currentTrees!.slice(subtreeIndex + 1),
        ];
      }),
    [trees]
  );
  const SELECTION_MODE = "multiselect";
  const flatTree = useHeadlessFlatTree_unstable(
    React.useMemo(
      () => {
        const itemsWithButtons = trees.flatMap((subtree, index) => {
          const subtreeIndex = index + 1;
          return [
            ...subtree,
            {
              value: `${subtreeIndex}-btn`,
              parentValue: subtree[0].value,
              content: "Add new item",
            }
          ];
        });
    
        return itemsWithButtons;
      },
      [trees]
    ),
    {
      onOpenChange: handleOpenChange,
      selectionMode: editMode === true ? SELECTION_MODE : undefined,
      onCheckedChange: onCheckedChange,
      defaultOpenItems:
        checkedItems !== undefined
          ? Array.from(checkedItems!)
              .filter(
                ([key, value]) =>
                  value !== false && !key.toString().endsWith("-btn")
              )
              .map(([key, value]) => `${key}`)
          : [],
      defaultCheckedItems:
        checkedItems !== undefined
          ? Array.from(checkedItems!)
              .filter(
                ([key, value]) =>
                  value === true && !key.toString().endsWith("-btn")
              )
              .map(([key, value]) => `${key}`)
          : [],
    }
  );

  React.useEffect(() => {
    if (itemToFocusRef.current) {
      itemToFocusRef.current.focus();
      setItemToFocusValue(undefined);
    }
  }, [itemToFocusValue]);

  return (
    <>
      <FlatTree {...flatTree.getTreeProps()} aria-label="Manipulation">
        {Array.from(flatTree.items(), (item) => {
          const { content, ...treeItemProps } = item.getTreeItemProps();
          return (
            <CustomTreeItem
              {...treeItemProps}
              key={item.value}
              onRemoveItem={removeFlatTreeItem}
              ref={item.value === itemToFocusValue ? itemToFocusRef : null}
              editMode = {editMode}
            >
              {content}
            </CustomTreeItem>
          );
        })}
      </FlatTree>
      <CommonDialog
        open={showPromptDialog}
        secondaryActionText={"Cancel"}
        maxWidth={600}
        onSecondaryAction={onClose}
        primaryActionText="Save"
        onPrimaryAction={onAddPromptSave}
        title="Add new Prompt"
        disablePrimaryAction={
          newPrompt === undefined || newPrompt === "undefined"
        }
      >
        <AddPrompt
          setNewPrompt={setNewPrompt}
          newPrompt={newPrompt}
        ></AddPrompt>
      </CommonDialog>
    </>
  );
};
