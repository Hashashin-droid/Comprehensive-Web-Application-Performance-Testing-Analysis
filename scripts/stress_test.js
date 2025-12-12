import http from "k6/http";
import { sleep } from "k6";

export let options = {
  stages: [
    { duration: "30s", target: 50 },    // warm-up
    { duration: "30s", target: 200 },   // moderate load
    { duration: "30s", target: 500 },   // heavy load
    { duration: "1m", target: 1000 },  // stress peak
    { duration: "30s", target: 0 },     // recovery
  ],
  thresholds: {
    http_req_duration: ["p(95) < 1000"],  // p95 under 1s
    http_req_failed: ["rate < 0.01"],     // <1% errors
  },
};

export default function () {
  const res = http.get("https://test.k6.io");
  sleep(1);
}
