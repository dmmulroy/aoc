import gleam/int
import gleam/list
import gleam/pair
import gleam/result
import gleam/string
import simplifile

pub fn run() {
  use lines <- result.try(
    simplifile.read(from: "src/day1/input.txt")
    |> result.map(string.trim)
    |> result.map(string.split(_, "\n"))
    |> result.replace_error("error reading input"),
  )

  use #(list_a, list_b) <- result.map(list.try_fold(
    over: lines,
    from: #([], []),
    with: fold_line,
  ))

  let sorted_list_a = list.sort(list_a, by: int.compare)
  let sorted_list_b = list.sort(list_b, by: int.compare)

  list.map2(sorted_list_a, sorted_list_b, fn(a, b) { int.absolute_value(a - b) })
  |> int.sum
}

fn fold_line(acc, line) {
  use int_list <- result.try(
    string.split(line, "   ")
    |> list.map(int.parse)
    |> result.all
    |> result.replace_error("error parsing integer"),
  )

  use #(a, b) <- result.try(case int_list {
    [a, b] -> Ok(#(a, b))
    _ -> Error("malformed list")
  })

  Ok(#([a, ..pair.first(acc)], [b, ..pair.second(acc)]))
}
