# README

I focused on static version using material-ui rather than building components. For dynamic data, the demo is not yet feature complete.

## Incomplete Steps

Incomplete data steps show an alert

- Remove update logic from open handler ...
- ... then add it to new update handler
- Actually manipulate state array (update/create/delete handlers)
- Update create handler to use actual user data, not hardcoded
- Wire up delete handler
- update mock data (important for ui design and ux)

With more time, I would next:

- [ ] Use carrum colors
- [ ] Notify user of success with `<SnackBar>` (from material-ui)
- [ ] Prettify
- [ ] Wire up mock API server (`json-server` and axios) then use `db.json` as data source
- [ ] Upgrade form - 1/2 - multiple `address` fields (for data object, not string)
- [ ] Upgrade form - 2/2 - two `name` fields, (first and last, then compute the full)
- [ ] Iterate further for priority features like validation, fluid/responsive/nicer presentation, etcetera
