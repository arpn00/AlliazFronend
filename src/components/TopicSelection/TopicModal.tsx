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
  Tooltip,
} from "@fluentui/react-components";
import {
  Delete20Regular,
  Delete20Filled,
  Edit20Regular,
  Add20Regular,
  TextNumberFormat20Regular,
  bundleIcon,
} from "@fluentui/react-icons";
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
  onUpdateItem?: (value: string) => void;
  onAddItem?: (value: string) => void;
  onAddLength?: (value: string) => void;
  editMode?: boolean;
};

const CustomTreeItem = React.forwardRef(
  (
    {
      onRemoveItem,
      onUpdateItem,
      onAddItem,
      onAddLength,
      editMode,
      ...props
    }: CustomTreeItemProps,
    ref: React.Ref<HTMLDivElement> | undefined
  ) => {
    const focusTargetAttribute = useRestoreFocusTarget();
    const level = props["aria-level"];
    const value = props.value as string;
    const isItemRemovable = level !== 1 && !value.endsWith("-btn");
    const handleRemoveItem = React.useCallback(() => {
      onRemoveItem?.(value);
    }, [value, onRemoveItem]);

    const handleAddItem = React.useCallback(() => {
      onAddItem?.(value);
    }, [value, onAddItem]);

    const handleUpdateItem = React.useCallback(() => {
      onUpdateItem?.(value);
    }, [value, onUpdateItem]);

    const handleAddLength = React.useCallback(() => {
      onAddLength?.(value);
    }, [value, onAddLength]);

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
                isItemRemovable && editMode ? (
                  <>
                    <Tooltip content="Remove" relationship="description">
                      <Button
                        aria-label="Remove item"
                        appearance="subtle"
                        onClick={handleRemoveItem}
                        icon={<Delete20Regular />}
                      />
                    </Tooltip>
                    <Tooltip content="Edit" relationship="description">
                      <Button
                        aria-label="Edit prompt"
                        appearance="subtle"
                        onClick={handleUpdateItem}
                        icon={<Edit20Regular />}
                      />
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip
                      content="Set length for Topic"
                      relationship="description"
                    >
                      <Button
                        aria-label="Add Length"
                        appearance="subtle"
                        onClick={handleAddLength}
                        icon={<TextNumberFormat20Regular />}
                      />
                    </Tooltip>
                    <Tooltip
                      content="Add new prompt"
                      relationship="description"
                    >
                      <Button
                        aria-label="Add Sub Prompt"
                        appearance="subtle"
                        onClick={handleAddItem}
                        icon={<Add20Regular />}
                      />
                    </Tooltip>
                  </>
                )
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
  checkedItems?: Map<TreeItemValue, TreeSelectionValue> | undefined;
  setCheckedItems?: React.Dispatch<Map<TreeItemValue, TreeSelectionValue>>;
  trees: ItemProps[][];
  setTrees?: React.Dispatch<React.SetStateAction<ItemProps[][] | undefined>>;
  editMode?: boolean;
  topicParagraph: Map<string, string>;
  setTopicParagraph: React.Dispatch<Map<string, string>>;
}

export const TopicModal: FC<TopicModalProps> = (props) => {
  const {
    checkedItems,
    setCheckedItems,
    trees,
    setTrees,
    editMode = true,
    topicParagraph,
    setTopicParagraph
  } = props;
  const [showPromptDialog, setShowPromptDialog] =
    React.useState<boolean>(false);
  const [isNew, setIsNew] = React.useState<boolean | undefined>(undefined);
  const [isParagraphLength, setIsParagraphLength] = React.useState<
    boolean | undefined
  >(undefined);
  const [subtreeIndex, setSubtreeIndex] = React.useState<number | undefined>(
    undefined
  );
  const [newPrompt, setNewPrompt] = React.useState<string | undefined>(
    undefined
  );
  const [newParagraphLength, setNewParagraphLength] = React.useState<
    string | undefined
  >(undefined);
  const [currentItemIndex, setCurrentItemIndex] = React.useState<
    number | undefined
  >(undefined);
  const onClose = () => {
    setNewPrompt(undefined);
    setIsParagraphLength(false);
    setIsNew(false);
    setNewParagraphLength(undefined);
    setShowPromptDialog(false);
  };

  const onAddPromptSave = () => {
    addFlatTreeItem(subtreeIndex);
    setNewPrompt(undefined);
    setShowPromptDialog(false);
  };

  const onAddPromptLengthSave = () => {
    const newMap = new Map(topicParagraph);
    const currentItem =   trees![subtreeIndex!] ;
    newMap.set(currentItem[0].content, newParagraphLength!);
    setTopicParagraph(newMap);
    setIsParagraphLength(false);
    setNewParagraphLength(undefined);
    setShowPromptDialog(false);
  };

  const itemToFocusRef = React.useRef<HTMLDivElement>(null);
  const [itemToFocusValue, setItemToFocusValue] =
    React.useState<TreeItemValue>();

  const handleOpenChange = (
    event: TreeOpenChangeEvent,
    data: TreeOpenChangeData
  ) => {
    const value = data.value as string;
    if (value.endsWith("-btn")) {
      const subtreeIndex = Number(value[0]) - 1;
      setSubtreeIndex(subtreeIndex);
      setIsNew(true);
      setShowPromptDialog(true);
    }
  };

  const addFlatTreeItem = (subtreeIndex: number | undefined) =>
    setTrees!((currentTrees) => {
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
    setCheckedItems!(data.checkedItems);
  };

  const addPrompt = (value: string) => {
    const subtreeIndex = Number(value[0]) - 1;
    setSubtreeIndex(subtreeIndex);
    setIsNew(true);
    setShowPromptDialog(true);
  };

  const addParagraphLength = (value: string) => {
    const subtreeIndex = Number(value[0]) - 1;
    const currentContent = trees[subtreeIndex];
    if (topicParagraph.has(currentContent[0].content)) {
      
      setNewParagraphLength(topicParagraph.get(currentContent[0].content));
    } else {
      setNewParagraphLength(undefined);
    }
    setShowPromptDialog(true);
    setIsParagraphLength(true);
    setSubtreeIndex(subtreeIndex);

  };

  const updateFlatTreeItem = (value: string) => {
    const subtreeIndex = Number(value[0]) - 1;
    const currentSubTree = trees[subtreeIndex];
    const itemIndex = currentSubTree.findIndex((item) => item.value === value);
    const currentContent = currentSubTree[itemIndex].content;
    setNewPrompt(currentContent);
    setCurrentItemIndex(itemIndex);
    setSubtreeIndex(subtreeIndex);
    setIsNew(false);
    setShowPromptDialog(true);
  };

  const onEditPromptSave = () => {
    updateItem(subtreeIndex, currentItemIndex, newPrompt);
    setNewPrompt(undefined);
    setShowPromptDialog(false);
  };

  const updateItem = React.useCallback(
    (
      subtreeIndex: number | undefined,
      currentItemIndex: number | undefined,
      newPrompt: string | undefined
    ) =>
      setTrees!((currentTrees) => {
        currentTrees![subtreeIndex!].filter(
          (_item, index) => index == currentItemIndex
        )[0].content = newPrompt!;
        return [...currentTrees!];
      }),
    [trees]
  );

  const removeFlatTreeItem = React.useCallback(
    (value: string) =>
      setTrees!((currentTrees) => {
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
    React.useMemo(() => {
      const itemsWithButtons = trees.flatMap((subtree, index) => {
        const subtreeIndex = index + 1;
        return subtree;
        // if (editMode) {
        //   return [
        //     ...subtree,
        //     {
        //       value: `${subtreeIndex}-btn`,
        //       parentValue: subtree[0].value,
        //       content: "Add prompt",
        //     },
        //   ];
        // } else {
        //   return subtree;
        // }
      });
      return itemsWithButtons;
    }, [trees]),
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
              onUpdateItem={updateFlatTreeItem}
              onAddItem={addPrompt}
              onAddLength={addParagraphLength}
              ref={item.value === itemToFocusValue ? itemToFocusRef : null}
              editMode={editMode}
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
        onPrimaryAction={
          isParagraphLength === true
            ? onAddPromptLengthSave
            : isNew === true
            ? onAddPromptSave
            : onEditPromptSave
        }
        title={
          isParagraphLength === true
            ? "Enter lenth of Paragaraph"
            : isNew === true
            ? "Add New Prompt"
            : "Edit Prompt"
        }
        disablePrimaryAction={
          isParagraphLength !== true
            ? newPrompt === undefined || newPrompt === "undefined"
            : newParagraphLength === undefined ||
              newParagraphLength === "undefined"
        }
      >
        <AddPrompt
          setNewPrompt={
            isParagraphLength === true ? setNewParagraphLength : setNewPrompt
          }
          newPrompt={
            isParagraphLength === true ? newParagraphLength : newPrompt
          }
        ></AddPrompt>
      </CommonDialog>
    </>
  );
};
