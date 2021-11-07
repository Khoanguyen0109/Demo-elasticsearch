export default (theme) => ({
  root: {
  },
  layoutSidebar: {
    width: theme.sideBar.openWidth,
  },
  layoutSidebarClose: {
    width: theme.sideBar.width,
  },
  layoutContent: {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100vh'
  }
});