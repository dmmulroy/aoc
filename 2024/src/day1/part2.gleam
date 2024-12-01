import gleam/dict
import gleam/int
import gleam/list
import gleam/option
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

  use #(list_a, count_lookup) <- result.map(list.try_fold(
    over: lines,
    from: #([], dict.new()),
    with: fold_line,
  ))

  list.fold(over: list_a, from: 0, with: fn(sum, a) {
    let count = dict.get(count_lookup, a) |> result.unwrap(0)
    a * count + sum
  })
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

  Ok(#(
    [a, ..pair.first(acc)],
    dict.upsert(pair.second(acc), b, fn(opt) {
      case opt {
        option.Some(count) -> count + 1
        option.None -> 1
      }
    }),
  ))
}
