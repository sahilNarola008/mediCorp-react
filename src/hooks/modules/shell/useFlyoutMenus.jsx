import React from "react"
import { StyledTreeItem, useMenus } from "@waystone"

function useFlyoutMenus() {
  const menuItems = useMenus()
  const renderTree = (nodes) =>
    nodes.map(({ id, labelText, icon, children, navigate }) => (
      <StyledTreeItem
        key={id}
        nodeId={id}
        label={labelText}
        labelIcon={icon}
        linkTo={navigate}
      >
        {Array.isArray(children) ? renderTree(children) : null}
      </StyledTreeItem>
    ))

  return {
    menus: renderTree(menuItems),
  }
}

export default useFlyoutMenus
