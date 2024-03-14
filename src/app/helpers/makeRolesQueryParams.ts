const makeRolesQueryParams = (
  queryParams: any,
  alias: string,
) => {
  let query = '';
  const queryParts: string[] = [];
  const params: { [key: string]: string } = {};
  if (queryParams.id) {
    if (typeof queryParams.id === 'number') {
      queryParts.push(`${alias}.id = :id`);
      params['id'] = queryParams.id;
    }
    queryParts.push(`${alias}.id IN (:...ids)`);
    params['ids'] = queryParams.id.split(',');
  }
  if (queryParams.slug) {
    queryParts.push(`${alias}.slug = :slug`);
    params['slug'] = queryParams.slug;
  }

  if (queryParams.searchOnAttributes) {
    const searchingAttributes =
      queryParams.searchOnAttributes.split(',');
    const orQueryParts: string[] = [];
    for (const attribute of searchingAttributes) {
      orQueryParts.push(
        `${alias}.${attribute} like :searchValue`,
      );
    }
    queryParts.push(`(${orQueryParts.join(' OR ')})`);
    params['searchValue'] = `%${queryParams.searchValue}%`;
  }
  query = queryParts.join(' AND ');
  return { query, params };
};

export { makeRolesQueryParams as MakeRolesQueryParams };
