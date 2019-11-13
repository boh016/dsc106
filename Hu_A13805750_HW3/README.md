I used Jquery and Highcharts for general functionality of this dashboard

I used fontawesome for the bar pie icons

Since I could not find the picture on the top left, I screen shot the title and used that as mine. The picture might look blurry

Limitation:
The pie chart might need to wait for the charts in the left to be fully rendered first in order to stop its own animation

The pie chart after clicking the changing to pie button would be off in position but would adjust itself after moving your mouse

I could not figure out how to have the specific data when mouse hover on different area on the stack plot, but I think the legend table would do the work

Modification:
The time of the data, although we are not emphasizing the accuracy of the content, is in GMT, so I put the time zone on the legend

I think the dynamic table should only be treated as legend so I did not put the time on it in order to decrease the decoding complexity.

The pie chart is in percentage and only has the generation data instead of both sources and loads. Since the loads have negative percentage (sources and loads add up to 100%), I recalculated the percentage on just resources and ploted pie chart
