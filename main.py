from kivy_garden.mapview.geojson import GeoJsonMapLayer
from kivymd.app import MDApp
from kivymd.uix.dialog import MDDialog
from kivymd.uix.boxlayout import MDBoxLayout
from kivymd.uix.pickers import MDDatePicker
from datetime import datetime
from kivymd.uix.list import TwoLineAvatarIconListItem, ILeftBodyTouch
from kivymd.uix.selectioncontrol import MDCheckbox
from kivy_garden.mapview import MapView, MapMarker

from geojson import Point, Feature, FeatureCollection, dump

import DijkestraSP as fx
import osmnx as ox
from osmnx import geocoder
from shapely.geometry import LineString, shape
import json

markers_list = dict()
markers_list_marker = dict()
paths_list = []
paths_list_marker = dict()

print("osmnx version", ox.__version__)


class ListItemWithCheckbox(TwoLineAvatarIconListItem):
    '''Custom list item'''

    def __init__(self, pk=None, **kwargs):
        super().__init__(**kwargs)
        self.pk = pk

    def mark(self, check, the_list_item):
        '''mark the task as complete or incomplete'''
        app = MDApp.get_running_app()

        if check.active:
            marker = markers_list_marker[the_list_item.pk] = {
                'marker': MapMarker(lat=markers_list[the_list_item.pk]['lat'],
                                    lon=markers_list[the_list_item.pk]['lon']),
                'id': the_list_item.pk}
            app.root.ids.mapview.add_marker(marker['marker'])
        else:
            app.root.ids.mapview.remove_marker(markers_list_marker[the_list_item.pk]['marker'])
            markers_list_marker.pop(the_list_item.pk)
            if the_list_item.pk in paths_list_marker:
                for i in range(0, len(paths_list_marker[the_list_item.pk])):
                    if paths_list_marker[the_list_item.pk][i] in paths_list:
                        app.root.ids.mapview.remove_layer(paths_list_marker[the_list_item.pk][i])
                        paths_list.remove(paths_list_marker[the_list_item.pk][i])

    def delete_item(self, the_list_item):
        self.parent.remove_widget(the_list_item)

        if the_list_item.pk in markers_list_marker:
            app.root.ids.mapview.remove_marker(markers_list_marker[the_list_item.pk]['marker'])
            markers_list_marker.pop(the_list_item.pk)
            if the_list_item.pk in paths_list_marker:
                for i in range(0, len(paths_list_marker[the_list_item.pk])):
                    if paths_list_marker[the_list_item.pk][i] in paths_list:
                        app.root.ids.mapview.remove_layer(paths_list_marker[the_list_item.pk][i])
                        paths_list.remove(paths_list_marker[the_list_item.pk][i])

                paths_list_marker.pop(the_list_item.pk)
        markers_list.pop(the_list_item.pk)


class LeftCheckbox(ILeftBodyTouch, MDCheckbox):
    '''Custom left container'''


class MainApp(MDApp):
    task_list_dialog = None

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.marker_id = 0

        json_file = open("geo.json")
        data = json.load(json_file)
        boundary_polygon = shape(data["features"][0]['geometry'])

        self.graph = ox.graph_from_polygon(boundary_polygon, network_type='drive', simplify=False)
        self.nodes, self.edges = ox.graph_to_gdfs(self.graph)

    def build(self):
        self.theme_cls.primary_palette = "Red"               

    def on_start(self):
        if not markers_list:
            for key, val in markers_list:
                add_marker_info = ListItemWithCheckbox(pk=key, text=val)
                self.root.ids.container.add_widget(add_marker_info)

        if not markers_list_marker:
            for key, val in markers_list_marker:
                add_marker_info = ListItemWithCheckbox(pk=key, text=val)
                add_marker_info.ids.check.active = True
                self.root.ids.container.add_widget(add_marker_info)

    def add_marker(self, marker_info_text):
        try:
            lat, lon = geocoder.geocode(query=marker_info_text)
            markers_list[self.marker_id] = {'text': marker_info_text, 'lat': lat, 'lon': lon, 'id': self.marker_id}

            self.root.ids['container'].add_widget(
                ListItemWithCheckbox(pk=self.marker_id, text=marker_info_text)
            )

            self.marker_id += 1
        except Exception:
            print("error")

    def shortest_path(self):
        if len(paths_list):
            for key, value in paths_list_marker.items():
                if value in paths_list:
                    self.root.ids.mapview.remove_layer(value)
            paths_list.clear()
        paths_list_marker.clear()

        for i in range(0, len(markers_list_marker) - 1):
            markers_list_marker_values = list(markers_list_marker.values())
            print(markers_list_marker_values)
            to_marker = markers_list_marker_values[i]
            from_marker = markers_list_marker_values[i + 1]
            to_marker['marker'].nearest_node = ox.get_nearest_node(self.graph, (to_marker['marker'].lat, to_marker['marker'].lon))
            from_marker['marker'].nearest_node = ox.get_nearest_node(self.graph, (from_marker['marker'].lat, from_marker['marker'].lon))

            shortest_path = fx.dijkstra_sp(self.graph,
                                             to_marker['marker'].nearest_node,
                                             from_marker['marker'].nearest_node,
                                             weight='length')
            shortest_path_points = self.nodes.loc[shortest_path]

            features = []
            features.append(Feature(geometry=LineString(shortest_path_points.geometry.values),
                                    properties={"stroke": "#fa0000", "stroke-width": "1"}))

            feature_collection = FeatureCollection(features)
            layer = GeoJsonMapLayer(geojson=feature_collection)
            self.root.ids.mapview.add_layer(layer)

            if from_marker['id'] in paths_list_marker:
                paths_list_marker[from_marker['id']].append(layer)
            else:
                paths_list_marker[from_marker['id']] = [layer]

            if to_marker['id'] in paths_list_marker:
                paths_list_marker[to_marker['id']].append(layer)
            else:
                paths_list_marker[to_marker['id']] = [layer]

            paths_list.append(layer)

        print("PATHS: ", paths_list_marker)


if __name__ == '__main__':
    app = MainApp()
    app.run()
