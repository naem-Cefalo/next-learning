const jobStatus = {
  published: 'published',
  draft: 'draft',
  archived: 'archived',
  all: 'all'
}


const jobFilters = [
  {
    id: jobStatus.published,
    name: 'Published'
  }, {
    id: jobStatus.draft,
    name: 'Draft'
  }, {
    id: jobStatus.archived,
    name: 'Archived'
  }, {
    id: jobStatus.all,
    name: 'All Jobs'
  }];


export { jobStatus, jobFilters};


