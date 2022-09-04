import {
  PaginationAvailableSearch,
  PaginationPage,
  PaginationPerPage,
  PaginationSearch,
  PaginationSort,
} from 'src/common/pagination/decorators/pagination.decorator';
import { IPaginationSort } from 'src/common/pagination/pagination.interface';
import { PaginationListAbstract } from '../../../common/pagination/abstracts/pagination.abstract';
import { PaginationAvailableSort } from '../../../common/pagination/decorators/pagination.decorator';
import {
  CATEGORY_DEFAULT_PER_PAGE,
  CATEGORY_DEFAULT_SORT,
  CATEGORY_DEFAULT_AVAILABLE_SORT,
} from '../constants/category.list.constant';
import {
  CATEGORY_DEFAULT_AVAILABLE_SEARCH,
  CATEGORY_DEFAULT_PAGE,
} from '../constants/category.list.constant';
export class CategoryListDto implements PaginationListAbstract {
  @PaginationSearch(CATEGORY_DEFAULT_AVAILABLE_SEARCH)
  readonly search: Record<string, any>;

  @PaginationAvailableSearch(CATEGORY_DEFAULT_AVAILABLE_SEARCH)
  readonly availableSearch: string[];

  @PaginationPage(CATEGORY_DEFAULT_PAGE)
  readonly page: number;

  @PaginationPerPage(CATEGORY_DEFAULT_PER_PAGE)
  readonly perPage: number;

  @PaginationSort(CATEGORY_DEFAULT_SORT, CATEGORY_DEFAULT_AVAILABLE_SORT)
  readonly sort: IPaginationSort;

  @PaginationAvailableSort(CATEGORY_DEFAULT_AVAILABLE_SORT)
  readonly availableSort: string[];
}
