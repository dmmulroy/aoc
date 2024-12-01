import day1/runner as day1_runner
import gleam/int
import gleam/io

pub fn main() {
  io.println("day 1")
  let assert Ok(day1_part1) = day1_runner.part1()
  io.println("part 1: " <> int.to_string(day1_part1))
  let assert Ok(day1_part2) = day1_runner.part2()
  io.println("part 2: " <> int.to_string(day1_part2))
}
