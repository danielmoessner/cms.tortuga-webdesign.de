import classNames from 'classnames'
import React, {createElement} from 'react'
import config from 'config:sanity'
import ComposeIcon from 'part:@sanity/base/compose-icon'
import HamburgerIcon from 'part:@sanity/base/hamburger-icon'
import {StateLink} from 'part:@sanity/base/router'
import SearchIcon from 'part:@sanity/base/search-icon'
import Button from 'part:@sanity/components/buttons/default'
import {Tooltip} from 'part:@sanity/components/tooltip'
import * as sidecar from 'part:@sanity/default-layout/sidecar?'
import ToolMenu from 'part:@sanity/default-layout/tool-switcher'
import {DatasetSelect} from '@sanity/default-layout/lib/components'
import {HAS_SPACES} from '@sanity/default-layout/lib/util/spaces'
import {Router, Tool} from '@sanity/default-layout/lib/types'
import Branding from '@sanity/default-layout/lib/navbar/branding/Branding'
import LoginStatus from '@sanity/default-layout/lib/navbar/loginStatus/LoginStatus'
import SanityStatusContainer from '@sanity/default-layout/lib/navbar/studioStatus/SanityStatusContainer'
import {PresenceMenu} from '@sanity/default-layout/lib/navbar/presenceMenu'
import SearchContainer from '@sanity/default-layout/lib/navbar/search/SearchContainer'

import styles from '@sanity/default-layout/lib/navbar/Navbar.css'

interface Props {
  createMenuIsOpen: boolean
  onCreateButtonClick: () => void
  onSearchClose: () => void
  onSearchOpen: () => void
  onSetLoginStatusElement: (element: HTMLDivElement) => void
  onSetSearchElement: (element: HTMLDivElement) => void
  onSwitchTool: () => void
  onToggleMenu: () => void
  onUserLogout: () => void
  router: Router
  searchIsOpen: boolean
  showLabel: boolean
  showToolMenu: boolean
  tools: Tool[]
}

const TOUCH_DEVICE = 'ontouchstart' in document.documentElement

// eslint-disable-next-line complexity
export default function Navbar(props: Props) {
  const {
    createMenuIsOpen,
    onCreateButtonClick,
    onToggleMenu,
    onSwitchTool,
    onUserLogout,
    onSearchOpen,
    onSearchClose,
    onSetLoginStatusElement,
    onSetSearchElement,
    router,
    tools,
    searchIsOpen,
    showLabel,
    showToolMenu,
  } = props

  const rootState = HAS_SPACES && router.state.space ? {space: router.state.space} : {}
  const className = classNames(styles.root, showToolMenu && styles.withToolMenu)
  const searchClassName = classNames(styles.search, searchIsOpen && styles.searchIsOpen)

  return (
    <div className={className} data-search-open={searchIsOpen}>
      <div className={styles.hamburger}>
        <Button
          aria-label="Open menu"
          icon={HamburgerIcon}
          kind="simple"
          onClick={onToggleMenu}
          padding="small"
          title="Open menu"
          tone="navbar"
        />
      </div>
      <div className={styles.branding}>
        <StateLink state={rootState} className={styles.brandingLink}>
          <Branding projectName={config && config.project.name} />
        </StateLink>
      </div>
      {HAS_SPACES && (
        <div className={styles.datasetSelect}>
          <DatasetSelect isVisible={showToolMenu} tone="navbar" />
        </div>
      )}
      <div className={styles.createButton}>
        {/* REMOVE THE CREATE DOCUMENT BUTTON
        <Tooltip
          disabled={TOUCH_DEVICE}
          content={
            (<span className={styles.createButtonTooltipContent}>Create new document</span>) as any
          }
          tone="navbar"
        >
          <div>
            <Button
              aria-label="Create"
              icon={ComposeIcon}
              kind="simple"
              onClick={onCreateButtonClick}
              padding="small"
              selected={createMenuIsOpen}
              tone="navbar"
            />
          </div>
        </Tooltip>
        */}
      </div>
      <div className={searchClassName} ref={onSetSearchElement}>
        {/* REMOVE THE SEARCH BAR
        <div>
          <SearchContainer
            shouldBeFocused={searchIsOpen}
            onOpen={onSearchOpen}
            onClose={onSearchClose}
          />
        </div>
        */}
      </div> 
      <div className={styles.toolSwitcher}>
        {tools.length > 1 && (
          <ToolMenu
            direction="horizontal"
            isVisible={showToolMenu}
            tools={tools}
            activeToolName={router.state.tool}
            onSwitchTool={onSwitchTool}
            router={router}
            showLabel={showLabel}
            tone="navbar"
          />
        )}
      </div>
      <div className={styles.extras}>{/* Insert plugins here */}</div>
      <div className={styles.sanityStatus}>
        <SanityStatusContainer />
      </div>
      {sidecar && sidecar.isSidecarEnabled && sidecar.isSidecarEnabled() && (
        <div className={styles.helpButton}>
          {sidecar && createElement(sidecar.SidecarToggleButton)}
        </div>
      )}
      {/* REMOVE THE MANAGE ICON 
      <div className={styles.presenceStatus}>
        <PresenceMenu />
      </div>
      */}
      <div className={styles.loginStatus} ref={onSetLoginStatusElement}>
        <LoginStatus onLogout={onUserLogout} />
      </div>
      <div className={styles.searchButton}>
        <Button
          icon={SearchIcon}
          kind="simple"
          onClick={onSearchOpen}
          padding="small"
          tone="navbar"
        />
      </div>
    </div>
  )
}