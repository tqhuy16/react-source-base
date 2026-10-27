import { Table as AntdTable } from 'antd'
import type { ColumnsType, TableProps } from 'antd/es/table'

import { TablePaginationPositionTop, TablePaginationPositionBottom } from '@/types/global'
import globalVariable from '@/configs'

interface ITableProps<T> {
  columns: ColumnsType<T>
  paginationPositionTop?: TablePaginationPositionTop | 'none'
  paginationPositionBottom?: TablePaginationPositionBottom | 'none'
  loading?: boolean
  bordered?: boolean
  defaultPageSize?: number
  isShowPagination?: boolean
  showSizeChanger?: boolean
  hideOnSinglePage?: boolean
  showQuickJumper?: boolean
  title?: string
  data?: T[]
  rowKey?: TableProps<T>['rowKey']
  onChange?: TableProps<T>['onChange']
}

const Table = <T extends object>({
  columns,
  paginationPositionTop = 'none',
  paginationPositionBottom = 'none',
  loading,
  bordered,
  defaultPageSize = globalVariable.PAGINATION_PAGE_SIZE,
  showSizeChanger = false,
  hideOnSinglePage = false,
  showQuickJumper = false,
  title = '',
  data,
  rowKey = 'id',
  onChange
}: ITableProps<T>) => {
  return (
    <AntdTable<T>
      rowKey={rowKey}
      columns={columns}
      loading={loading}
      bordered={bordered}
      dataSource={data}
      title={title ? () => title : undefined}
      onChange={onChange}
      pagination={{
        position: [
          paginationPositionTop as TablePaginationPositionTop,
          paginationPositionBottom as TablePaginationPositionBottom
        ],
        showTotal: (totalRecord, range) => `${range[0]}-${range[1]} of ${totalRecord} items`,
        defaultPageSize,
        showSizeChanger,
        hideOnSinglePage,
        showQuickJumper
      }}
    />
  )
}

export default Table
