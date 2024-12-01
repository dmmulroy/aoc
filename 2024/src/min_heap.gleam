import gleam/option.{None, Some}

pub type MinHeap(data) {
  Empty
  Node(value: data, left: MinHeap(data), right: MinHeap(data))
}

pub fn new() {
  Empty
}

pub fn is_empty(heap) {
  case heap {
    Empty -> True
    _ -> False
  }
}

pub fn find_min(heap) {
  case heap {
    Empty -> None
    Node(value, _, _) -> value
  }
}

pub fn merge(heap1, heap2, compare) {
  case heap1, heap2 {
    Empty, heap | heap, Empty -> heap
    Node(value1, left1, right1), Node(value2, left2, right2) ->
      case compare(value1, value2) {
        True -> Node(value1, merge(right1, heap2, compare), left1)
        False -> Node(value2, merge(right2, heap1, compare), left2)
      }
  }
}

pub fn insert(heap, value, compare) {
  merge(Node(value, Empty, Empty), heap, compare)
}

pub fn delete_min(heap, compare) {
  case heap {
    Empty -> None
    Node(_, left, right) -> Some(merge(left, right, compare))
  }
}

pub fn fold(over heap, from acc, with fold_fn) {
  case heap {
    Empty -> acc
    Node(value, left, right) -> {
      let left_fold = fold(left, acc, fold_fn)
      let right_fold = fold(right, left_fold, fold_fn)
      fold_fn(right_fold, value)
    }
  }
}

pub fn map(over heap, with map_fn) {
  case heap {
    Empty -> Empty
    Node(value, left, right) -> {
      let left_map = map(left, map_fn)
      let right_map = map(right, map_fn)
      Node(map_fn(value), left_map, right_map)
    }
  }
}

pub fn map2(over_first heap1, over_second heap2, with map_fn) {
  case heap1, heap2 {
    Empty, _ -> Empty
    _, Empty -> Empty
    Node(value1, left1, right1), Node(value2, left2, right2) -> {
      let left_map = map2(left1, left2, map_fn)
      let right_map = map2(right1, right2, map_fn)
      Node(map_fn(value1, value2), left_map, right_map)
    }
  }
}
